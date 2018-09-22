import React, {PureComponent} from 'react';
import { Redirect, Route} from "react-router-dom";
import ChatBox from "./ChatBox";
import {getTimePassed, isMobile, openScreenNoAnimation} from "../Utils";
import mixpanel from 'mixpanel-browser'

class ChatBoxContainer extends PureComponent {
	constructor(props) {
		super(props);
		if (!this.props.location.state || !this.props.location.state.question  || !this.props.location.state.answer) {
			this.redirect = true
		} else {
			this.stage = {question: this.props.location.state.question, answer: this.props.location.state.answer};
			this.redirect = false
		}
		this.state = {
			error: false
		}
		this.questionNumber = 0;
	}

	submitUserInput = async (question, answer) => {
		try {
			let audio = document.getElementById("audio-next");
			audio.play();
			if (!answer) {
				this.setState({error: true});
				return;
			}
			this.setState({error: false});
			let data = {
				body: JSON.stringify({_id: this.dbUser, question: question, answer: answer}),
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
				if (!resJson.stage || !resJson.stage.question || !resJson.stage.answer) {
					throw resJson``
				}
				setTimeout(() => {
					this.stage = resJson.stage;
					this.questionNumber = this.questionNumber + 1;
					this.props.history.push({
						pathname: `/chat/${this.questionNumber}`,
						state: {question: resJson.stage.question, answer: resJson.stage.answer, consultantImg: resJson.stage.consultantImg}
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

	startChat = async () => {
		try {
			if (window.navigator.vibrate) {
				window.navigator.vibrate(60);
			}
			if (isMobile()) {
				mixpanel.track("Moved to 2nd Screen MOBILE");
			} else {
				mixpanel.track("Moved to 2nd Screen WEB");
			}
			let startTime = new Date();
			let res = await fetch("/start_chat", {method: "POST"});
			if (res.status === 200) {
				let resJson = await res.json();

				setTimeout(() => {
					this.props.history.push({
						pathname: `/chat/${this.questionNumber}`,
						state: {question: resJson.question, answer: resJson.answer}
					})
					openScreenNoAnimation();
					this.state = resJson;
					this.questionNumber = this.questionNumber + 1;
				}, getTimePassed(startTime, 2))
			} else {
				openScreenNoAnimation();
				this.setState({
					redirect: true
				});
			}
		} catch (e) {
			console.error(e);
			openScreenNoAnimation();
			this.setState({
				redirect: true
			});
		}
	}

	componentDidMount() {
		this.startChat();
	}

	render() {

		if (this.redirect) {
			return <Redirect to='/'/>;
		}
		return (
			<Route path="/chat/:number"  render={(props) => (
				<ChatBox key={props.match.params.number} {...props} error={this.state.error} dbUser={this.dbUser} submitUserInput={this.submitUserInput}/>)} />
		);
	}
}

export default ChatBoxContainer;