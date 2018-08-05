import React, { Component } from 'react';
import './home.css';
import './page-transition.css';
import Title from './Title/Title';
import MobileTitle from './Mobile/Title';
import MobileFooter from './Mobile/Footer';
import $ from "jquery";
import gsap from 'gsap'
import CSSRulePlugin from "gsap/CSSRulePlugin";
import TimelineMax from 'gsap/TimelineMax';
import {isMobile} from './../Utils'
import Power2 from 'gsap'
import mixpanel from 'mixpanel-browser'
import Loader from './../ChatBox/Loader'
import ConsultantsBody from "./ConsultantsBody/ConsultantsBody";


export default class Home extends Component {
    state = {
        consultants: [],
        error: false,
    }

    fetchConsultants() {
        fetch("/consultants/get_consultants")
            .then(
                (response) => {
                    if (response.status !== 200) {
                        console.log(` Status Code: ${response.status}
                                    Error Getting consultant. Error: ${(response.error ? response.error : "")}`);
                        this.error = "Error Retrieving Data";
                        this.showError();
                        return;
                    }
                    response.json().then(resJson => {
                        this.error = resJson.length > 0 ? "" : "No Results";
                        console.log(resJson);
                        this.openScreen();
                        this.setState({consultants : resJson});
                    });
                }
            )
            .catch(function(err) {
                // this.showError();
                let loader = document.getElementById("between-loader");
                loader.style.opacity = 0;
                loader.style.zIndex = 0;
                this.setState({error: true});
                console.log('Fetch Error :-S', err);
            });

    }
    showError = () => {
        let loader = document.getElementById("between-loader");
        loader.style.opacity = 0;
        loader.style.zIndex = 0;
        this.setState({error: true});
    };
    componentWillMount() {
        $(window).bind(
            'touchmove',
             function(e) {
              e.preventDefault();
            }
          );
        let tl = new TimelineMax();
        
        tl.to(CSSRulePlugin.getRule('body:before'), 0, {
            cssRule: {top: '50%'}, 
            ease: Power2.easeOut
        }, 'close')
        .to(CSSRulePlugin.getRule('body:after'), 0, {
            cssRule: {bottom: '50%'},
            ease: Power2.easeOut
        }, 'close');
            
        mixpanel.init("51c48d0df1de5595d3eec4fe1add3518");
        this.fetchConsultants();
    }
    componentDidMount() {
        let loader = document.getElementById("between-loader");
        loader.style.opacity = 1;
        loader.style.zIndex = 500;
    }
    
    
    openScreen = () => {
        console.log("OPENING");
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
            if (mobile) {
                setTimeout(() => this.props.history.push({
                    pathname: '/chat',
                    state: {mobile: mobile, consultants: this.state.consultants}
                }), 1700);
            } else {
                setTimeout( () => this.props.history.push({pathname:'/chat/' + consultant.name,
                    state: { name: consultant.name, email:consultant.email }
                }), 1700)
            }
            let tl = new TimelineMax();
            tl.to(CSSRulePlugin.getRule('body:before'), 0.25, {
                    cssRule: {top: '50%'}, 
                    ease: Power2.easeOut}, 'close')
                .to(CSSRulePlugin.getRule('body:after'), 0.25, {
                    cssRule: {bottom: '50%'},
                    ease: Power2.easeOut
                }, 'close')
                .to($('.between-loader'), 0.25, {opacity: 1, zIndex: 500})
                // .to(CSSRulePlugin.getRule('body:before'), 0.25, {
                //     cssRule: {top: '0%'},
                //     ease: Power2.easeOut
                // }, '+=1.9', 'open')
                // .to(CSSRulePlugin.getRule('body:after'), 0.25, {
                //     cssRule: {bottom: '0%'},
                //     ease: Power2.easeOut
                // }, '-=0.25', 'open')
                // .to($('.between-loader'), 0.25, {opacity: 0, zIndex: 0}, '-=0.25');
        } else {
            console.error("No Consultants");
        }
    };

    render() {
        
        return (
                <div className="home-wrapper">
                {this.state.error ? <div className="err-msg">תקלת בשרת. טען מחדש.</div> : 
                    isMobile() ?
                        <div className="home-mobile" >
                            <MobileTitle/>
                            <MobileFooter closeScreen={this.closeScreen} />
                        </div> :
                        <div className="home-web-wrapper">
                        <div className="home-web">
                            <Title/>
                            <ConsultantsBody closeScreen={this.closeScreen} consultants={this.state.consultants} history={this.props.history}/>
                        </div>
                        </div>
                    }
                </div>
                

        )
    }
}