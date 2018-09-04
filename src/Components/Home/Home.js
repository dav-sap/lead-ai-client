import React, { Component } from 'react';
import './home.css';
import './page-transition.css';
import Title from './Title/Title';
import MobileTitle from './Mobile/Title';
import MobileFooter from './Mobile/Footer';
import $ from "jquery";
import {closeScreen, isMobile} from './../Utils'
import mixpanel from 'mixpanel-browser'
import NextButton from '../NextButton/NextButton'
import {openScreenNoAnimation} from "../Utils";

export default class Home extends Component {

    constructor(props) {
        super(props);

        $(window).bind(
            'touchmove',
            function(e) {
                e.preventDefault();
            }
        );
        mixpanel.init("51c48d0df1de5595d3eec4fe1add3518");
    }

    state = {
        error: false,
    }

    showError = () => {
        this.setState({error: true});
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
            closeScreen();
			setTimeout(async () => {
				let res = await fetch("/start_chat", {method: "POST"});
				if (res.status === 200) {
					let resJson = await res.json();
					this.props.history.push({
						pathname: '/chat',
						state: {firstStage: resJson}
					})
				} else {
					openScreenNoAnimation();
					this.showError();
				}
			}, 500)

		} catch (e) {
            console.error(e);
			openScreenNoAnimation();
			this.showError();
        }
    }

    render() {
        return (
            <div className="home-wrapper">
				{isMobile() ?
					<div className="home-mobile">
						<MobileTitle/>
						<MobileFooter startChat={this.startChat}/>
					</div> :
					<div className="home-web-wrapper">
						<Title/>
						{this.state.error ? <div className="err-msg">תקלת בשרת. טען מחדש.</div> : ""}
						<NextButton width={260} text={"יאללה בוא נתחיל"} onClick={this.startChat}
									buttonClass={"lone-button"}/>
						<div className="images-wrapper">
							<img alt="man-1" className="img-man-first img-man" src="/images/man-1.png"/>
							<img alt="man-2" className="img-man-second img-man" src="/images/man-2.png"/>
							<img alt="man-3" className="img-man-third img-man" src="/images/man-3.png"/>
							<img alt="man-4" className="img-man-first img-man" src="/images/man-4.png"/>
						</div>
					</div>
				}
            </div>
        )
    }
}