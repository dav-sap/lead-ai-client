import React, { Component } from 'react';
import "./chat-box.css"
import "./send-loader.css"
import "./loading-dots.css"
import {ERROR} from "../Consts";
import {ANSWER_OPTION, ANSWER_INPUT, MOBILE_BOT, ANSWER_CALENDAR, ANSWER_PIC_OPTIONS} from './GraphBot';
import MobileHeader from "../Home/Mobile/MobileHeader";
import Typist from 'react-typist';
import AnswerInput from "./AnswerInput/AnswerInput";
import AnswerOptions from "./AnswerOptions/AnswerOptions";
import AnswerCalendar from "./AnswerCalendar/AnswerCalendar";
import AnswerPicOptions from "./AnswerPicOptions";
import $ from "jquery";
// import gsap from 'gsap'
import CSSRulePlugin from "gsap/CSSRulePlugin";
import TimelineMax from 'gsap/TimelineMax';
import Power2 from 'gsap'
import Confetti2 from 'react-dom-confetti';
import AnswerCalendarMobile from "./AnswerCalendarMobile/AnswerCalendarMobile";
import {isMobile} from "../Utils";

const config = {
    angle: 90,
    spread: 60,
    startVelocity: 20,
    elementCount: 30,
    decay: 0.95
};
export default class ChatBox extends Component {

    state = {
        currentNode: null,
        error: false,
        showAnswers: false,
        nodeIndex: 0,
        hoveringSubmitButton: false,
        shootConfetti: false,

    };

    dbUser = null;
    bot = null;
    chatStartDate = null;
    isDate = null;

    disableError = () => {
        this.setState({
            error: false
        })
    }
    createUser = async (name) => {
        try {
            let data = {
                body: JSON.stringify({name: name}),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            };
            let res = await fetch("/users/add_user", data);
            if (res && res.status === 200) {
                let resJson = await res.json();
                if (resJson && resJson.user) {
                    this.dbUser = resJson.user;
                    this.chatStartDate = resJson.chatStartDate;
                    console.log(resJson.user.name);
                    setTimeout(() => this.setState({
                        showAnswers: false,
                        currentNode: this.state.currentNode.childNodes()[0].childNodes()[0],
                        nodeIndex: this.state.nodeIndex + 1,
                    }), 2000);
                }
            } else {
                this.setState({error: true});
                console.error("Server Error");
            }
        } catch (error) {
            this.setState({error: true});
            console.error(error);
        }
    };
    changeShootConfetti = ()=> {
        if (!this.state.shootConfetti) {
            
            try {
                window.navigator.vibrate(40);
            } catch (err) {
                console.error(err);
            }
            this.setState({
                    shootConfetti: true
                }, () => {
                    setTimeout(() => this.setState({shootConfetti: false}), 1000)
                }
            )
        }
    };
    addDataToDB = async (question, answer, newNode) => {
        try {
            
            let data = {
                body: JSON.stringify({_id: this.dbUser._id, startDate: this.chatStartDate, question:question, answer: answer}),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            };
            let res = await fetch("/users/add_chat_answer",data);
            if (res && res.status === 200) {
                let resJson = await res.json();
                if (resJson && resJson.info) {
                    if (newNode.data().completed) {
                        setTimeout(() => {this.setState({showAnswers: false, currentNode: newNode,  nodeIndex: this.state.nodeIndex + 1});
                            setTimeout(() => {console.log("COMPLETED!");this.changeShootConfetti()}, 3500);}, 2000);
                    }
                    setTimeout(() => this.setState({showAnswers: false, currentNode: newNode,  nodeIndex: this.state.nodeIndex + 1,}), 2000);
                }
            } else {
                this.setState({error: true});
                console.error(res);
            }
        } catch(error) {
            this.setState({error: true});
            console.error(error);
        }
    };



    chooseConsultant = (name)=> {
        this.consultantChosen = name;
        setTimeout(() => this.setState({showAnswers: false, currentNode: this.state.currentNode.childNodes()[0].childNodes()[0], nodeIndex: this.state.nodeIndex + 1,}), 2000);
    };

    componentWillMount(){
        // if (!this.props.location.state || (!isMobile() && !this.props.location.state.name) || (isMobile() && !this.props.location.state.consultants)) {
        if (!this.props.location.state || !this.props.location.state.consultants) {
            this.props.history.push({pathname:'/'})
            this.setState({
                redirect: true
            })
            return;
        }
        if (isMobile()) {
            this.bot = MOBILE_BOT;
        } else {
            // this.consultantChosen = this.props.location.state.name;
            this.bot = MOBILE_BOT;
        }
        this.setState({
            currentNode : this.bot.rootNode()
        })
    }
    componentDidMount() {
        let tl = new TimelineMax();
        tl.to(CSSRulePlugin.getRule('body:before'), 0.25, {
            cssRule: {top: '0%'},
            ease: Power2.easeOut
        }, '+=1.0', 'open')
        .to(CSSRulePlugin.getRule('body:after'), 0.25, {
            cssRule: {bottom: '0%'},
            ease: Power2.easeOut
        }, '-=0.25', 'open')
        .to($('.between-loader'), 0.25, {opacity: 0, zIndex: 0}, '-=0.25');
        
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.currentNode.data().getName) {
            nextState.currentNode.data().name = this.dbUser.name;

        } if (nextState.currentNode.data().getConsultantName) {
            nextState.currentNode.data().consultantName = this.consultantChosen === "טלי" ?  "טלי תיצור" : this.consultantChosen + " יצור";
        } 
    }
    onFinishType = () => {
        this.setState({showAnswers:true});
        if (this.state.currentNode.data().completed) {
            let audio = document.getElementById("audio-end");
            audio.play().then(() => {
                console.log("Playing...")
            })
            .catch((err) => {
                console.error(err);
            })
        }
    };
    getAnswerStyle(answerNode) {
        if (this.state.showAnswers) {
            if ( answerNode && answerNode.data().type === ANSWER_CALENDAR) {
                return {
                    visibility:"visible",
                    opacity:"1",
                    top:"0",
                    paddingBottom: "0"

                }
            }
            return {
                visibility:"visible",
                opacity:"1",
                top:"0",

            }
        } else {
            return {
                visibility:"hidden",
                opacity:"0",
                top:"10px",
                transitionProperty: "none",
            }
        }
    }
    
    render() {
        let answerNode = this.state.currentNode && this.state.currentNode.childNodes()[0] ? this.state.currentNode.childNodes()[0] : null;
        if (this.state.redirect) {
            return <div></div>
        }
        return (
            <div className="chat-box-wrapper" style={{
                backgroundColor: isMobile() ? "#272727" : "", 
                backgroundImage: !isMobile() ? "radial-gradient(circle at 52% 93%, #023365, #000000)" : "",
                minHeight: isMobile() ? "350px" : "450px",
                overflowY: this.state.currentNode.data().completed ? "hidden" : "auto"}}>
                
                <img  alt="" src="/images/hands.png" style={{display:"none"}}/>
                <div className="chat-box">
                    {isMobile() ? <MobileHeader/> : ""}
                    <div className="text-wrapper" style={{direction: this.state.currentNode.data().dir ? this.state.currentNode.data().dir : "rtl"}} >
                        <Typist key={this.state.nodeIndex} avgTypingDelay={35} stdTypingDelay={0} className="text-typer" startDelay={1500} onTypingDone={this.onFinishType} >
                        <span>
                            {this.state.currentNode.data().content}
                        </span>
                        </Typist>

                    </div>
                    <div className="answer-wrapper" style={this.getAnswerStyle(answerNode)}>
                        {this.state.error ? <div className="error-msg">{ERROR}</div> : ""}
                        {answerNode && answerNode.data().type === ANSWER_PIC_OPTIONS ?
                            <AnswerPicOptions answerNode={answerNode} data={ this.props.location.state.consultants} showing={this.state.showAnswers} disableError={this.disableError}
                                              history={this.props.history} currentNode={this.state.currentNode} chooseConsultant={this.chooseConsultant} error={this.state.error}/> : ""}
                        {answerNode && answerNode.data().type === ANSWER_INPUT  && this.state.showAnswers?
                            <AnswerInput answerNode={answerNode} currentNode={this.state.currentNode} error={this.state.error} disableError={this.disableError}
                                         addDataToDB={this.addDataToDB} createUser={this.createUser} /> : ""}
                        {answerNode && answerNode.data().type === ANSWER_CALENDAR && this.state.showAnswers?
                            !isMobile() ?
                            <AnswerCalendar answerNode={answerNode} addDataToDB={this.addDataToDB} currentNode={this.state.currentNode} error={this.state.error} disableError={this.disableError}/> :
                            <AnswerCalendarMobile answerNode={answerNode} addDataToDB={this.addDataToDB} currentNode={this.state.currentNode} error={this.state.error} disableError={this.disableError}/> : ""}
                        {answerNode && answerNode.data().type === ANSWER_OPTION && this.state.showAnswers?
                           <AnswerOptions answerNode={answerNode} bot={this.bot} addDataToDB={this.addDataToDB} error={this.state.error} disableError={this.disableError} currentNode={this.state.currentNode} /> : ""}

                           {this.state.currentNode && this.state.currentNode.data().completed && this.state.showAnswers?
                            
                            <div className="end-image-wrapper no-select" onClick={this.changeShootConfetti}>
                                <div className="glow-image-end"/>
                                <img className="end-img" alt="" src="/images/hands.png" />
                                
                                <div style={{position: "absolute", top: "50%", left: "50%"}}>
                                <Confetti2 active={ this.state.shootConfetti } config={ config } />
                                </div>
                            </div>: ""}

                    </div>
                </div>
            </div>
        );
    }
}