import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import React, {Component} from "react";
import ChatBox from "./Components/ChatBox/ChatBox";
import Home from "./Components/Home/Home";
import './animations.css';



export default class App extends Component {
    
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
                        <Route  path="/chat" component={ChatBox}/>
                        <Redirect from='*' to='/' />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}