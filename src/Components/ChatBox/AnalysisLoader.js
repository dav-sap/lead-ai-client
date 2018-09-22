import React, { Component } from 'react';
import "./analysis-loader.css"

export default class AnalysisLoader extends Component {

	componentDidMount() {
		let circle, diameter, percentage, starting, total_loading;

		window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame);
		total_loading = 10 * 1100; //10s
		diameter = 2 * Math.PI * 48;
		circle = document.querySelector('circle');
		percentage = document.getElementsByClassName('loader-percentage')[0];
		starting = performance.now();

		const update = function() {
			let progress;
			progress = parseInt(100 * (performance.now() - starting) / total_loading);
			circle.setAttribute("stroke-dasharray", `${diameter * progress / 100}, ${diameter}`);
			percentage.innerHTML = progress;
			if (progress >= 100) {
				finish();
				return false;
			}
			return window.requestAnimationFrame(update);
		};

		update();

		const finish = function() {
			percentage.innerHTML = "✓";
		};

	}

	render() {
		return (
			<div className="analysis-loader">
				<svg version="1.1" id="Layer_1" x="0px" y="0px"
					 width="100px" height="100px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">

        			<circle cx="50" cy="50" r="48" stroke="red" fillOpacity="0" strokeWidth="3" strokeDasharray="0, 301"  />
    			</svg>

				<span className="loader-percentage">0</span>
			</div>

		)
	}
}