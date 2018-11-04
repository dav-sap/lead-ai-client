import React, { Component } from 'react';
import './home.css';
import './page-transition.css';
import Title from './Title/Title';
import MobileTitle from './Mobile/Title';
import MobileFooter from './Mobile/Footer';
import {closeScreen, isMobile} from './../Utils'
import NextButton from '../NextButton/NextButton'
import mixpanel from "mixpanel-browser";

export default class Home extends Component {

    startChat = () => {
    	try {
			if (window.navigator.vibrate) {
				window.navigator.vibrate(60);
			}
			mixpanel.track(`welcome_screen.clicked`, {"device": `${isMobile() ? "mobile" : "web"}`});
			closeScreen();
			this.props.history.push({pathname: '/chat', state: {restartChat: true}})
		} catch (e) {
    		console.error(e);
		}
    }

	componentDidMount() {
		mixpanel.track(`welcome_screen.viewed`, {"device": `${isMobile() ? "mobile" : "web"}`});
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
						<div className="new-service">שירות חדש</div>
						<Title/>
						{/*{this.state.error ? <div className="err-msg">תקלת בשרת. טען מחדש.</div> : ""}*/}
						<NextButton width={260} text={"יאללה בוא נתחיל"} onClick={this.startChat}
									buttonClass={"lone-button"}/>
						<div className="images-wrapper">
							<img alt="man-1" className="img-man-first img-man" src="/images/man-1.png"/>
							<img alt="man-3" className="img-man-third img-man" src="/images/man-3.png"/>
							<img alt="man-4" className="img-man-first img-man" src="/images/man-4.png"/>
						</div>
					</div>
				}
            </div>
        )
    }
}