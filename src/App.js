import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import React, {Component} from "react";
import Home from "./Components/Home/Home";
import './animations.css';
import ChatBoxContainer from "./Components/ChatBox/ChatBoxContainer";
import mixpanel from "mixpanel-browser";

export default class App extends Component {
	constructor(props) {
		super(props);
		mixpanel.init("51c48d0df1de5595d3eec4fe1add3518");
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