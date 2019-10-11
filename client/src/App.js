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
		
	render() {
		const allStepsByDay = this.countNumberOfStepsInOneDay(this.state.data);
		this.populateObj(allStepsByDay);
		console.log(this.state.weekObj);
		return (
			<div>
				Test
			</div>
		);
	}
}

export default App;
