import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import React, {Component} from "react";
import Home from "./Components/Home/Home";
import './animations.css';
import ChatBoxContainer from "./Components/ChatBox/ChatBoxContainer";
import mixpanel from "mixpanel-browser";
const config = require('./config/utils.json')

export default class App extends Component {
	constructor(props) {
		super(props);
		mixpanel.init(config.mixpanel.id);
		window.addEventListener('touchmove', (e) => {e.preventDefault();});
	}

	render() {
        
        return (
            <div style={{width:"100%", height: "100%"}}>
                <div id="between-loader" className="between-loader">
                    <div className="between-bar1"/>
                    <div className="between-bar2"/>
                    <div className="between-bar3"/>
                    <div className="between-bar4"/>
                    <div className="between-bar5"/>
                    <div className="between-bar6"/>
                </div>
                <BrowserRouter>
                    <Switch>
                        <Route  exact path="/" component={Home}/>
                        <Route  path="/chat" component={ChatBoxContainer}/>
                        <Redirect from='*' to='/' />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}