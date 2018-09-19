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
import { getTimePassed, isMobile, openScreen} from "../Utils";
import CompletionStage from "./CompletionStage/CompletionStage";
import AnswerMultipleOptions from "./AnswerMultipleOptions/AnswerMultipleOptions";
import Loader from "./Loader";
import ConsultantCard from "./ConsultantCard/ConsultantCard";
import AnalysisLoader from "./AnalysisLoader";


export default class ChatBox extends PureComponent {
	constructor(props) {
		super(props);
		let redirect;
		let stage = null;
		if (!this.props.location.state || !this.props.location.state.firstStage) {
			redirect = true;
			this.props.history.push({pathname: '/'})
		} else {
			stage = this.props.location.state.firstStage;
			redirect = false;
		}
		this.state = {
			stage: stage,
			error: false,
			showAnswers: false,
			questionNumber: 0,
			redirect: redirect,
			questionToShow: ""
		}
	}

    dbUser = null;

    disableError = () => {
        this.setState({
            error: false
        })
    }

    submitUserInput = async (answer) => {
        try {
			let audio = document.getElementById("audio-next");
			audio.play();
        	if (!answer) {
				this.setState({error: true});
        		return;
			}
			this.setState({error: false});
            let data = {
                body: JSON.stringify({_id: this.dbUser, question:this.state.stage.question,
					answer: answer.key !== undefined ? answer : {value: answer, key: this.state.stage.answer.key}}),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            };
            let startTime = new Date();
            let res = await fetch("/users/add_chat_answer",data);
            if (res && res.status === 200) {
                let resJson = await res.json();
                if (resJson.newUser) {
                	this.dbUser = resJson.newUser._id;
				}
                setTimeout(() => {
					this.setState({
						stage: resJson.stage,
						showAnswers: false,
						questionNumber: this.state.questionNumber + 1,
						innerQuestionIdx: 0
					})
				}, getTimePassed(startTime, 1.5))
            } else {
                this.setState({error: true});
                console.error(res);
            }
        } catch(error) {
            this.setState({error: true});
            console.error(error);
        }
    };

    componentDidMount() {
		openScreen();
    }

    onFinishType = () => {
		if (Array.isArray(this.state.stage.question)) {
			if (this.state.innerQuestionIdx + 1 < this.state.stage.question.length) {
				this.setState({
					questionNumber: this.state.questionNumber + 1,
					innerQuestionIdx: this.state.innerQuestionIdx + 1
				})
			} else if (this.state.innerQuestionIdx + 1 === this.state.stage.question.length) {
				this.submitUserInput("getting next question");
			}
		} else {
			this.setState({showAnswers: true});
		}
    };

	getComponentToRender = () => {
		if (!this.state.stage || !this.state.stage.answer) {
			return ""
		}
		switch (this.state.stage.answer.type) {
			case ANSWER_TYPES.INPUT:
				return <AnswerInput onSubmit={this.submitUserInput} answer={this.state.stage.answer} error={this.state.error}/>
			case ANSWER_TYPES.OPTIONS:
				return <AnswerOptions onSubmit={this.submitUserInput} answer={this.state.stage.answer} error={this.state.error}/>
			case ANSWER_TYPES.RADIO_OPTIONS:
				return <AnswerRadioOptions onSubmit={this.submitUserInput} answer={this.state.stage.answer} error={this.state.error}/>
			case ANSWER_TYPES.MULTIPLE_OPTIONS:
				return <AnswerMultipleOptions onSubmit={this.submitUserInput} answer={this.state.stage.answer} error={this.state.error}/>
			case ANSWER_TYPES.COMPLETED:
				return <CompletionStage dbUser={this.dbUser}/>
			case ANSWER_TYPES.NEXT_QUESTION:
				return <AnalysisLoader/>
			default:
				return "";

		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.stage.answer.type === ANSWER_TYPES.NEXT_QUESTION && !this.state.showAnswers) {
			setTimeout(() => this.setState({
				showAnswers: true
			}), 1100)
		}
	}


	static getDerivedStateFromProps(nextProps, prevState) {
		if (!prevState.stage || !prevState.stage.question) {
			return null;
		}
		let question = null;
		if (Array.isArray(prevState.stage.question)) {
			question = prevState.stage.question[prevState.innerQuestionIdx]
		} else {
			question = prevState.stage.question;
		}
		let questionToShow = question;

		let lines = question.split('\n');
		if (lines.length > 1) {
			questionToShow = lines.map((line, index) => {
				if (index + 1 === lines.length) {
					return <span key={index}>{line}</span>
				} else {
					return <span key={index}>{line}<br/><Typist.Delay ms={800} /></span>
				}
			})
		}
		return {
			questionToShow: questionToShow
		}
	}


    render() {
    	if (this.state.redirect) {
    		return <div></div>
		}
        return (
            <div className="chat-box-wrapper" style={{
                backgroundColor: isMobile() ? "#272727" : "", 
                backgroundImage: !isMobile() ? "radial-gradient(circle at 51% 75%, #0d2339, #000000)" : "",
                minHeight: isMobile() ? "350px" : "450px",
                }}>

                <div className="chat-box">
                    {isMobile() ? <MobileHeader/> : ""}
					<div className="text-wrapper">
						{this.state.stage.consultantImg ? <ConsultantCard imgPath={this.state.stage.consultantImg} show={this.state.showAnswers}/> : ""}
						<Typist key={this.state.questionNumber} avgTypingDelay={35} stdTypingDelay={0}
								className="text-typer" startDelay={Array.isArray(this.state.stage.question) ? 900 : 1800} onTypingDone={this.onFinishType}>
							<span>
								{this.state.questionToShow}
							</span>
							{Array.isArray(this.state.stage.question) && this.state.innerQuestionIdx + 1 < this.state.stage.question.length ?
								<Typist.Backspace count={this.state.stage.question[this.state.innerQuestionIdx].length} delay={1500} /> : ""}
						</Typist>
					</div>
					{this.state.showAnswers ?
						<div className="answer-wrapper">
							{this.state.error ? <div className="error-msg">{ERROR}</div> : ""}
							{this.getComponentToRender()}
							{/*<LastQuestionStage completedAnalysis={this.completedAnalysis} dbUser={this.dbUser}/>*/}
						</div>
					: ""}
                </div>
            </div>
        );
    }
}