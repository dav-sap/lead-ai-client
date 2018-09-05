import React, { Component } from 'react';
import CheckBoxButton from "./CheckBoxButton";
import NextButton from "../../NextButton/NextButton";
import Loader from "../Loader";

export default class AnswerMultipleOptions extends Component {

	state = {
		optionsChosen: [],
		sendLoading: false,
	}
	buttonClicked = (button) => {
		let optionsChosen = [...this.state.optionsChosen ];
		let idx = optionsChosen.indexOf(button);
		if (idx >= 0) {
			optionsChosen.splice(idx, 1);
		} else {
			optionsChosen.push(button);
		}
		this.setState({
			optionsChosen: optionsChosen
		})
	};

	handleSubmit = () => {
		try {
			if (this.state.optionsChosen.length > 0) {
				this.setState({sendLoading: true});
				this.props.onSubmit(this.state.optionsChosen.toString());
			}
		} catch (err) {
			this.setState({sendLoading: false});
			console.error(err);
		}
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.error) {
			return {
				sendLoading: false
			}
		}
		return null;
	}

	render() {
		return (
			<div>
				<div className="radio-button-wrapper">
					{this.props.answer.options.map((option, index) => {
						return <CheckBoxButton key={index} value={option} checked={this.state.optionsChosen.indexOf(option) > -1} onClick={this.buttonClicked}/>
					})}
				</div>
				{!this.state.sendLoading ? <NextButton width={203} text={"הבא"} disabled={this.state.optionsChosen.length === 0} onClick={this.handleSubmit} buttonClass="lone-button"/>  : <Loader/> }
			</div>
		)
	}
}