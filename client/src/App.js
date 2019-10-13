import React from 'react';
import config from './config';
import axios from 'axios';
import Card from '../src/components/Card/Card';
import CalendarItem from './components/CalendarItem/CalendarItem';
import SingleDay from './components/SingleDay/SingleDay';
import Header from './components/Header/Header';

const dayNames = [
	{
		day: 'Monday',
		date: 10
	},
	{
		day: 'Tuesday',
		date: 11
	},
	{
		day: 'Wednesday',
		date: 12
	},
	{
		day: 'Thursday',
		date: 13
	},
	{
		day: 'Friday',
		date: 14
	}
]

const dayObj = {
	day: '',
	date: '',
	totalSteps: 0,
	totalKM: 0,
	totalCalories: 0,
	totalHours: 0
};
let totalWeek = {};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			weekObj: [],
			activeDay: '',
			isActive: false
		}
	}

	async fetchData() {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		};
	
		await axios.get(config.api, requestOptions)
			.then(res => {
				this.setState({
					data: res.data
				})
			})
			.catch(err => console.log(err));
	}

	componentDidMount() {
		this.fetchData().then(res => {
			dayNames.forEach(item => {
				const day = item.day;
				const date = item.date;
				this.setState({
					weekObj: [...this.state.weekObj, {...dayObj, day, date}]
				});
			});
		});
	}

	calcTotalKM = (steps) => Math.round((steps) * 0.762);
	calcTotalCalories = (steps) => Math.round((steps) * 0.05);
	calcTotalHours = (steps) => Math.round((steps) * 0.5);

	countNumberOfStepsInOneDay(arr) {
		const allStepsByDay = {};
		arr.forEach(({ timestamp, steps }) => {
			const date = new Date(timestamp);
			const dayName = dayNames[date.getDay() - 1]; // -1 because we start from monday
			if (!(dayName.day in allStepsByDay)) {
				allStepsByDay[dayName.day] = 0;
			}
			allStepsByDay[dayName.day] += steps;
		});
		return allStepsByDay;
	}

	countNumberOfStepsInOneWeek(arr) {
		let totalWeekSteps = 0;
		let totalWeekKM = 0;
		let totalWeekCalories = 0;
		let totalWeekHours = 0;
		arr.forEach(item => {
			totalWeek = {
				totalWeekSteps: totalWeekSteps += item.totalSteps,
				totalWeekKM: totalWeekKM += item.totalKM,
				totalWeekCalories: totalWeekCalories += item.totalCalories,
				totalWeekHours: totalWeekHours += item.totalHours
			}
		});
		return totalWeek;
	}

	populateObj(allStepsByDay) {
		const newWeek = this.state.weekObj.map(obj => {
			const steps = allStepsByDay[obj.day];
			obj.totalSteps = steps;
			obj.totalCalories = this.calcTotalCalories(steps);
			obj.totalKM = this.calcTotalKM(steps);
			obj.totalHours = this.calcTotalHours(steps);
			return obj;
		});
		return newWeek;
	}

	handleClick = (getDay) => (e) => {
		this.setState({
			activeDay: getDay,
			isActive: true
		})
	}

	handleIsActiveSingleDay = (isActive) => {
		this.setState({
			isActive: !isActive
		})
	}

	render() {
		const { data, activeDay, isActive, weekObj } = this.state;
		this.populateObj(this.countNumberOfStepsInOneDay(data));
		this.countNumberOfStepsInOneWeek(weekObj);

		return (
			<div className="main">

				<Header title="Welcome!" subtitle="Overview of your activity" isActive={isActive} />

				<div className="calendar__wrapper">
					{weekObj && weekObj.map((item, index) => {
						return (
							<CalendarItem
								handleClick={this.handleClick}
								key={index} 
								day={item.day}
								date={item.date}
							/>
						)
					})}
				</div>

				<Card
					cardClass="card--large"
					title="Activity"
					subtitle="Average"
					iconName="icon-timer"
					totalWeekActivity={totalWeek.totalWeekHours}
				/>
				<Card
					title="Steps"
					subtitle="Total"
					iconName="icon-run"
					totalWeekActivity={totalWeek.totalWeekSteps}
				/>
				<Card
					title="Calories"
					subtitle="Total Burned"
					iconName="icon-burn"
					totalWeekActivity={totalWeek.totalWeekCalories}
				/>
				<div className={isActive ? `single-day__wrapper single-day__wrapper--active` : `single-day__wrapper`}>
					{weekObj && weekObj.map((item, index) => item.day === activeDay ? <SingleDay key={index} weekActivity={item} isActive={isActive} handleIsActiveSingleDay={this.handleIsActiveSingleDay} /> : '')}
				</div>
		
			</div>
		);
	}
}

export default App;
