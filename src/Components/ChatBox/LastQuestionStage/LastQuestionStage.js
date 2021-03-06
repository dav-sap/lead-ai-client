import React, {PureComponent} from 'react';
import './last-question-stage.css'
import Typist from "react-typist";

class LastQuestionStage extends PureComponent {

	constructor(props) {
		super(props);
		this.texts = ['שומר נתונים...', 'סורק מאגר רכבים..', 'מחפש יועץ רכב פנוי..', 'בינגו! 🍋🍓🥝'];
		this.state = {
			percent: 0,
			textToShow: this.texts[0],
			textIndex: 0
		}
	}

	async componentDidMount() {
		// this.setState({
		// 	textToShow: this.texts[0],
		// 	textIndex: 0
		// })
		let res  = await fetch('/consultants/get_consultant?user=' + this.props.dbUser, {method: 'GET'});
		let resJson = await res.json();
		console.log(resJson.user);
		this.intervalPercent = setInterval(() => {
			this.setState({
				percent: this.state.percent + 1
			})
		}, 100)
	}

	onFinishType = () => {
		if (this.state.textIndex + 1 === this.texts.length) {
			return
		}
		setTimeout(() => {
			let newTextIndex = this.state.textIndex + 1;
			this.setState({
				textToShow: this.texts[newTextIndex],
				textIndex: newTextIndex
			})
		}, 500)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.percent === 99) {
			clearInterval(this.intervalPercent);
			setTimeout(() =>{
				this.props.completedAnalysis();
			}, 1500)
		}
	}


	render() {
		return (
			<div className="last-question-wrapper">
				<Typist key={this.state.textIndex} avgTypingDelay={40} stdTypingDelay={0} className="text-typer" startDelay={500} onTypingDone={this.onFinishType} >
					<span>
						{this.state.textToShow}
					</span>
					<Typist.Backspace count={this.state.textToShow.length} delay={2000} />
				</Typist>
				<div className="progress-bar-percent">
					{this.state.percent} %
				</div>
				<div className="progress-bar"/>
			</div>
		);
	}
}


export default LastQuestionStage;