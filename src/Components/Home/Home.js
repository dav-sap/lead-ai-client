import React, { Component } from 'react';
import './home.css';
import './page-transition.css';
import Title from './Title/Title';
import MobileTitle from './Mobile/Title';
import MobileFooter from './Mobile/Footer';
import $ from "jquery";
import {closeScreen, isMobile} from './../Utils'
import NextButton from '../NextButton/NextButton'

export default class Home extends Component {

    constructor(props) {
        super(props);


    }

    startChat = async () => {
		closeScreen();
		this.props.history.push({pathname: '/chat'})
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
						{/*{this.state.error ? <div className="err-msg">תקלת בשרת. טען מחדש.</div> : ""}*/}
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