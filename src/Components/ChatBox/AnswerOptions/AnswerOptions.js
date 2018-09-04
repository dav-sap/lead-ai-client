import React, { Component } from 'react';
import Loader from "../Loader";
import NextButton from "../../NextButton/NextButton";
import './answer-options.css'

export default class AnswerOptions extends Component {
    state = {
        sendLoading: false,
    };
    answerClicked = (answer) => {
        this.setState({sendLoading: true});
		this.props.onSubmit(answer)
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
                {!this.state.sendLoading ?
                    <div className="answer-options-wrapper">
						{this.props.answer.options.map(option =>
							<NextButton width={130} text={option.value} key={option.key}
									   onClick={() => this.answerClicked(option)}/>
						)}
                    </div>
                :
				<div className="loader-wrapper" style={{visibility: !this.state.sendLoading ? "hidden" :"visible", position: "relative"}}>
					<Loader/>
				</div>
                }
        	</div>
		)
    }
}