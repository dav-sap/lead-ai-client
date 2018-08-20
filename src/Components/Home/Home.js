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
import {isMobile} from './../Utils'
import Power2 from 'gsap'
import mixpanel from 'mixpanel-browser'


export default class Home extends Component {

    constructor(props) {
        super(props);

        $(window).bind(
            'touchmove',
            function(e) {
                e.preventDefault();
            }
        );
        // let tl = new TimelineMax();
        // tl.to(CSSRulePlugin.getRule('body:before'), 0, {
        //     cssRule: {top: '50%'},
        //     ease: Power2.easeOut
        // }, 'close')
        //     .to(CSSRulePlugin.getRule('body:after'), 0, {
        //         cssRule: {bottom: '50%'},
        //         ease: Power2.easeOut
        //     }, 'close');

        mixpanel.init("51c48d0df1de5595d3eec4fe1add3518");
    }

    state = {
        consultants: [],
        error: false,
    }

    fetchConsultants = async () => {
        try {
            let response = await fetch("/consultants/get_consultants")

            if (response.status !== 200) {
                console.log(` Status Code: ${response.status}
                        Error Getting consultant. Error: ${(response.error ? response.error : "")}`);
                this.error = "Error Retrieving Data";
                this.showError();

            } else {
                let resJson = await response.json();
                this.error = resJson.length > 0 ? "" : "No Results";
                console.log(resJson);
                this.setState({consultants: resJson});
            }
        } catch (err) {
                this.setState({error: true});
                console.log('Fetch Error :-S', err);
        }
    };

    showError = () => {
        this.setState({error: true});
    };

    componentDidMount() {
        this.fetchConsultants();
    }
    
    
    openScreen = () => {
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
    closeScreen = (mobile, consultant) => {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(60);
        }
        if (isMobile()) {
            mixpanel.track("Moved to 2nd Screen MOBILE");
        } else {
            mixpanel.track("Moved to 2nd Screen WEB");
        }
        
        if (this.state.consultants.length > 0) {
            // if (mobile) {
                setTimeout(() => this.props.history.push({
                    pathname: '/chat',
                    state: {consultants: this.state.consultants}
                }), 1700);
            // } else {
            //     setTimeout( () => this.props.history.push({pathname:'/chat/' + consultant.name,
            //         state: { name: consultant.name, email:consultant.email }
            //     }), 1700)
            // }
            let tl = new TimelineMax();
            tl.to(CSSRulePlugin.getRule('body:before'), 0.25, {
                    cssRule: {top: '50%'}, 
                    ease: Power2.easeOut}, 'close')
                .to(CSSRulePlugin.getRule('body:after'), 0.25, {
                    cssRule: {bottom: '50%'},
                    ease: Power2.easeOut
                }, 'close')
                .to($('.between-loader'), 0.25, {opacity: 1, zIndex: 500})

        } else {
            console.error("No Consultants");
        }
    };

    render() {
        const buttonWidth = 260;
        return (
                <div className="home-wrapper">
                {this.state.error ? <div className="err-msg">תקלת בשרת. טען מחדש.</div> : 
                    isMobile() ?
                        <div className="home-mobile" >
                            <MobileTitle/>
                            <MobileFooter closeScreen={this.closeScreen} />
                        </div> :
                        <div className="home-web-wrapper">
                            <Title/>
                            <div className="home-start-button-wrapper" style={{width: buttonWidth}}>
                                <button className="submit-button start-button no-select" onClick={this.closeScreen} style={{width: (buttonWidth - 2).toString() + ".2px"}}>
                                    <div className="button-text">
                                        יאללה בוא נתחיל
                                    </div>
                                </button>
                                <svg className="svg-border" width={buttonWidth + 2}>
                                    <defs>
                                        <linearGradient id="borderGradient">
                                            <stop offset="0%"  stopColor="#02c0fd"/>
                                            <stop offset="30%" stopColor="#fecf03"/>
                                            <stop offset="100%" stopColor="#fd504f"/>
                                        </linearGradient>
                                    </defs>
                                    <g>
                                        <rect className="border-rect" width={buttonWidth} height="52" rx="18" ry="18" x="1" y="1"/>
                                    </g>
                                </svg>
                                <div className="button-shadow"/>
                            </div>
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