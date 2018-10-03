import React, { PureComponent } from 'react';
import "./chat-box.css"
import "./send-loader.css"
import "./loading-dots.css"
import {ANSWER_TYPES, ERROR} from "../Consts";
import MobileHeader from "../Home/Mobile/MobileHeader";
import Typist from 'react-typist';
import AnswerInput from "./AnswerInput/AnswerInput";
import AnswerOptions from "./AnswerOptions/AnswerOptions"
import AnswerRadioOptions from "./AnswerRadioOptions/AnswerRadioOptions"
import {isMobile} from "../Utils";
import CompletionStage from "./CompletionStage/CompletionStage";
import AnswerMultipleOptions from "./AnswerMultipleOptions/AnswerMultipleOptions";
import ConsultantCard from "./ConsultantCard/ConsultantCard";
import AnalysisLoader from "./AnalysisLoader";
import mixpanel from "mixpanel-browser";

export default class ChatBox extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showAnswers: false,
			questionToShow: "",
			innerQuestionIdx: 0,
		}
		this.question = this.props.location.state.question;
		this.answer = this.props.location.state.answer;
		this.consultantImg = this.props.location.state.consultantImg;

	}

    onFinishType = () => {
		if (Array.isArray(this.question.text)) {
			if (this.state.innerQuestionIdx + 1 < this.question.text.length) {
				return this.setState({
					innerQuestionIdx: this.state.innerQuestionIdx + 1
				})
			}
		}
		this.setState({showAnswers: true});
    };
	updateError = (error) => {
		this.props.updateError(error);
	}
	getComponentToRender = () => {
		if (!this.question || !this.answer) {
			return ""
		}
		switch (this.answer.type) {
			case ANSWER_TYPES.INPUT:
				return <AnswerInput onSubmit={(answer) => this.props.submitUserInput(this.question, {value: answer, key: this.answer.key})} answer={this.answer} error={this.props.error}/>
			case ANSWER_TYPES.OPTIONS:
				return <AnswerOptions onSubmit={(answer) => this.props.submitUserInput(this.question, answer)} answer={this.answer} error={this.props.error}/>
			case ANSWER_TYPES.RADIO_OPTIONS:
				return <AnswerRadioOptions onSubmit={(answer) => this.props.submitUserInput(this.question, {value: answer, key: this.answer.key})} answer={this.answer} error={this.props.error}/>
			case ANSWER_TYPES.MULTIPLE_OPTIONS:
				return <AnswerMultipleOptions onSubmit={(answer) => this.props.submitUserInput(this.question, {value: answer, key: this.answer.key})} answer={this.answer} error={this.props.error}/>
			case ANSWER_TYPES.COMPLETED:
				return <CompletionStage dbUser={this.props.dbUser}/>
			case ANSWER_TYPES.NEXT_QUESTION:
				return <AnalysisLoader  dbUser={this.props.dbUser} updateError={this.updateError} onSubmit={(answer) => this.props.submitUserInput(this.question, {value: answer, key: this.answer.key})} answer={this.answer} error={this.props.error}/>
			default:
				return "";

		}
	}

	componentDidMount() {
		if (this.answer.type === ANSWER_TYPES.NEXT_QUESTION) {
			setTimeout(() => this.setState({
				showAnswers: true
			}), 1100)
		}
		mixpanel.track(`${this.question.event}.viewed`, {"device": `${isMobile() ? "mobile" : "web"}`});
	}

	questionToShow = () => {
		if (!this.question) {
			return "";
		}
		let question = null;
		if (Array.isArray(this.question.text)) {
			question = this.question.text[this.state.innerQuestionIdx]
		} else {
			question = this.question.text;
		}
		if (!question) {
			return "";
		}
		let questionToShow = question;

		let lines = question.split('\n');
		if (lines.length > 1) {
			questionToShow = lines.map((line, index) => {
				if (index + 1 === lines.length) {
					return <span key={index}>{line}</span>
				} else {
					return <span key={index}>{line}<Typist.Delay ms={400} /><br/></span>
				}
			})
		}
		return questionToShow;
	}

	render() {
        return (
            <div className="chat-box-wrapper" style={{
				backgroundColor: isMobile() ? "#272727" : "", 
				backgroundImage: !isMobile() ? "radial-gradient(circle at 51% 75%, #0d2339, #000000)" : "",
				minHeight: isMobile() ? "350px" : "450px",
                }}>

                <div className="chat-box">
                    {isMobile() ? <MobileHeader/> : ""}
					<div className="text-wrapper">
						{this.consultantImg ? <ConsultantCard imgPath={this.consultantImg} show={this.state.showAnswers}/> : ""}
						<Typist avgTypingDelay={35} stdTypingDelay={0} key={this.state.innerQuestionIdx}
								className="text-typer" startDelay={Array.isArray(this.question.text) ? 900 : 1800} onTypingDone={this.onFinishType}>
							<span>
								{this.questionToShow()}
							</span>
							{Array.isArray(this.question.text) && this.state.innerQuestionIdx + 1 < this.question.text.length ?
								<Typist.Backspace count={this.question.text[this.state.innerQuestionIdx].length} delay={1500} /> : ""}
						</Typist>
					</div>
					{this.state.showAnswers ?
						<div className="answer-wrapper">
							{this.props.error ? <div className="error-msg">{ERROR}</div> : ""}
							{this.getComponentToRender()}
						</div>
					: ""}
                </div>
            </div>
        );
    }
}