import React, { Component } from 'react';
import "./analysis-loader.css"

export default class AnalysisLoader extends Component {

	state = {
		percent: 0,
		analyzing_completed: null
	}

	starting = performance.now();
	total_loading = 10 * 1100; //10s
	diameter = 2 * Math.PI * 48;
	submitted = false;


	async componentDidMount() {
		this.percentProgressInterval = setInterval(this.updatePercent, 50);
		this.circle = document.querySelector('circle');
		this.updatePercent();

		try {
			let data = {
				body: JSON.stringify({user: this.props.dbUser}),
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST',
			};
			let res = await fetch("/analyze_data", data);
			if (res.status === 200) {
				this.setState({analyzing_completed: true})
			} else {
				this.setState({analyzing_completed: false})
				this.props.updateError(true);
			}
		} catch (e) {
			this.setState({analyzing_completed: false})
			this.props.updateError(true);
		}

	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.percent === 100 && this.state.analyzing_completed && !this.submitted) {
			this.props.onSubmit("getting next question");
			this.submitted = true;
		} else if (this.state.analyzing_completed === false) {
			this.props.updateError(true);
		}
		if (this.state.percent > 100) {
			clearInterval(this.percentProgressInterval)
		}
	}

	updatePercent = () => {
		let progress = parseInt(100 * (performance.now() - this.starting) / this.total_loading);
		this.circle.setAttribute("stroke-dasharray", `${this.diameter * progress / 100}, ${this.diameter}`);
		this.setState({
			percent: progress
		})
	}

	render() {
		return (
			<div className="analysis-loader">
				<svg version="1.1" id="Layer_1" x="0px" y="0px"
					 width="100px" height="100px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">

        			<circle cx="50" cy="50" r="48" stroke="red" fillOpacity="0" strokeWidth="3" strokeDasharray="0, 301"  />
    			</svg>

				<span className="loader-percentage">{this.state.percent > 100 ?
					<svg viewBox="0 0 20 20">
						<polyline points="7.7,10.5 9.5,12.0 12.2,7.5"/>
					</svg>: this.state.percent}
					{this.state.percent <= 100 ? <span className="percent-char">%</span> : ""}
				</span>
			</div>

		)
	}
}