import React, {PureComponent} from 'react';
import { Redirect, Route} from "react-router-dom";
import ChatBox from "./ChatBox";
import {getTimePassed, isMobile, openScreen} from "../Utils";
import mixpanel from 'mixpanel-browser'

class ChatBoxContainer extends PureComponent {
	constructor(props) {
		super(props);
		if (!this.props.location.state || !this.props.location.state.question  || !this.props.location.state.answer) {
			this.redirect = true
		} else {
			this.redirect = false
		}
		this.state = {
			error: false
		}
		if (sessionStorage.getItem('user')) {
			this.dbUser = JSON.parse(sessionStorage.getItem('user'));
		}
	}

	updateError = (error) => {
		this.setState({error});
	}

	submitUserInput = async (question, answer) => {
		try {
			let audio = document.getElementById("audio-next");
			mixpanel.track(`${question.event}.answered`, {"device": `${isMobile() ? "mobile" : "web"}`});
			audio.play();
			if (!answer) {
				this.setState({error: true});
				return;
			}
			this.setState({error: false});
			let data = {
				body: JSON.stringify({_id: this.dbUser ? this.dbUser._id : null, question: question, answer: answer}),
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST',
			};
			console.log(question);
			console.log(answer);
			let startTime = new Date();
			let res = await fetch("/users/add_chat_answer",data);
			if (res && res.status === 200) {
				let resJson = await res.json();
				if (resJson.newUser) {
					sessionStorage.setItem('user', JSON.stringify(resJson.newUser));
					this.dbUser = resJson.newUser;
				}
				if (!resJson.stage || !resJson.stage.question || !resJson.stage.answer) {
					throw resJson;
				}
				setTimeout(() => {
					this.props.history.push({
						pathname: `/chat/${resJson.stage.question.key}`,
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

	errorGoBack = (e) => {
		console.error(e);
		openScreen();
		this.setState({
			redirect: true
		});
	}

	startChat = async () => {
		try {
			let startTime = new Date();
			let res = await fetch("/start_chat", {method: "POST"});
			if (res.status === 200) {
				let resJson = await res.json();
				setTimeout(() => {
					this.props.history.push({
						pathname: `/chat/${resJson.question.key}`,
						state: {question: resJson.question, answer: resJson.answer}
					})
					openScreen();
				}, getTimePassed(startTime, 1.5))
			} else {
				this.errorGoBack(res);
			}
		} catch (e) {
			this.errorGoBack(e);
		}
	}

	componentDidMount() {
		if (this.props.location.state && this.props.location.state.restartChat) {
			sessionStorage.setItem('user', null);
			this.dbUser = null;
			this.startChat();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.redirect) {
			this.openScreen();
		}
	}


	render() {

		if (this.redirect) {
			return <Redirect to='/'/>;
		}
		return (
			<Route path="/chat/:number"  render={(props) => (
				<ChatBox key={props.match.params.number} {...props} error={this.state.error} updateError={this.updateError} dbUser={this.dbUser} submitUserInput={this.submitUserInput}/>)} />
		);
	}
}

export default ChatBoxContainer;