import React, { Component } from 'react';
import RadioButton from "./RadioButton";
import './radio-button-wrapper.css'
import NextButton from "../../NextButton/NextButton";
import Loader from "../Loader";

export default class AnswerRadioOptions extends Component {

	state = {
		chosen: null,
		sendLoading: false,
	}
	buttonClicked = (button) => {
		this.setState({
			chosen: button
		})
	};

	handleSubmit = () => {
		try {
			if (this.state.chosen) {
				this.setState({sendLoading: true});
				this.props.onSubmit(this.state.chosen);
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
						return <RadioButton key={index} value={option} checked={this.state.chosen === option} onClick={this.buttonClicked}/>
					})}
				</div>
				{!this.state.sendLoading ? <NextButton width={203} text={"הבא"} disabled={!this.state.chosen} onClick={this.handleSubmit} buttonClass="lone-button"/>  : <Loader/> }
			</div>
		)
	}
}