import React from 'react';
import config from './config';
import axios from 'axios';

const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const dayObj = {
	day: '',
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
			weekObj: []
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
			dayNames.forEach(day => this.setState({
				weekObj: [...this.state.weekObj, {...dayObj, day}]
			}));
		});
	}

	countNumberOfStepsInOneDay(arr) {
		const allStepsByDay = {};
	
		arr.forEach(({ timestamp, steps }) => {
			const date = new Date(timestamp);
			const dayName = dayNames[date.getDay() - 1]; // -1 because we start from monday
			if (!(dayName in allStepsByDay)) {
				allStepsByDay[dayName] = 0;
			}
	
			allStepsByDay[dayName] += steps;
		});
	
		return allStepsByDay;
	}

	calcTotalKM = (steps) => Math.round((steps) * 0.762);
	calcTotalCalories = (steps) => Math.round((steps) * 0.05);
	calcTotalHours = (steps) => Math.round((steps) * 0.5);

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

		
	render() {
		const { data, weekObj } = this.state;
		const allStepsByDay = this.countNumberOfStepsInOneDay(data);
		this.populateObj(allStepsByDay);
		this.countNumberOfStepsInOneWeek(weekObj);
		return (
			<div>
				<header className="heaeder">
					<h1 className="header__title">Welcome</h1>
					<span className="header__subtile">Overview of your activity</span>
				</header>
			</div>
		);
	}
}

export default App;
