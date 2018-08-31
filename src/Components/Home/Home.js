import React, { Component } from 'react';
import './home.css';
import './page-transition.css';
import Title from './Title/Title';
import MobileTitle from './Mobile/Title';
import MobileFooter from './Mobile/Footer';
import $ from "jquery";
// import gsap from 'gsap'
import CSSRulePlugin from "gsap/CSSRulePlugin";
import TimelineMax from 'gsap/TimelineMax';
import {closeScreen, isMobile, openScreen} from './../Utils'
import Power2 from 'gsap'
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
        // consultants: [],
        error: false,
    }

    // fetchConsultants = async () => {
    //     try {
    //         let response = await fetch("/consultants/get_consultants")
    //
    //         if (response.status !== 200) {
    //             console.log(` Status Code: ${response.status}
    //                     Error Getting consultant. Error: ${(response.error ? response.error : "")}`);
    //             this.error = "Error Retrieving Data";
    //             this.showError();
    //
    //         } else {
    //             let resJson = await response.json();
    //             this.error = resJson.length > 0 ? "" : "No Results";
    //             console.log(resJson);
    //             this.setState({consultants: resJson});
    //         }
    //     } catch (err) {
    //             this.setState({error: true});
    //             console.log('Fetch Error :-S', err);
    //     }
    // };

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
						<MobileFooter closeScreen={this.closeScreen}/>
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