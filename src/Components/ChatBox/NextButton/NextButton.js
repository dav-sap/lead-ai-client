import React, { Component } from 'react';
import Loader from "./../Loader";
import './next-button.css'

export default class NextButton extends Component {
    state = {
        sendLoading: false,
    };

    handleSubmit = () => {
        try {
            let audio = document.getElementById("audio-next");
            audio.play();
            this.props.disableError();
            if (this.props.onClick) {
                this.props.onClick();
            } else {
                if (this.props.inputText !== "") {
                    this.setState({sendLoading: true});
                    if (this.props.currentNode.childNodes()[0].data().createUser) {
                        this.props.createUser(this.props.inputText);
                    } else {
                        this.props.addDataToDB(this.props.currentNode.data().content, this.props.inputText, this.props.currentNode.childNodes()[0].childNodes()[0]);
                    }

                }
            }
        } catch (err) {
            console.error(err);
        }
    };
    isFirefox() {
        return typeof InstallTrigger !== 'undefined';
    }


    componentWillReceiveProps(nextProps) {        
        if (nextProps.error) {
            this.setState({
                sendLoading: false
            })
        }
        if (nextProps.enterClicked && !nextProps.error && !this.state.sendLoading) {
            this.handleSubmit();
        }

    }

    render() {
        let width = this.props.nextButton ? 203 : 123;
        let margin = this.props.nextButton ? "auto" : "15px";
        let loc = this.props.loc ? this.props.loc : "0";
        return (
            <div className="input-button-wrapper" style={{top: loc}}>
                {!this.props.answerNode ? <div></div> :
                <div style={{position: "relative",margin: "auto", visibility: this.state.sendLoading ? "hidden" :"visible",
                            height: "54px", width:(width + 2).toString() + "px", marginRight: margin, marginLeft: margin}}>
                <button className="submit-button no-select" onClick={this.handleSubmit} disabled={!this.props.answerNode.data().validateSubmit(this.props.inputText)}
                     style={{cursor: this.props.answerNode.data().validateSubmit(this.props.inputText)? "pointer" :  "not-allowed",
                         width: (width - 2).toString() + ".2px", }}>

                    <div className="button-text" style={{opacity: this.props.answerNode.data().validateSubmit(this.props.inputText) ? "1" : "0.5"}}>
                        {this.props.content}
                    </div>
                </button>
                <svg className="svg-border" width={(width + 2).toString()} opacity={this.props.answerNode.data().validateSubmit(this.props.inputText) ? "1" : "0.5"}>
                    <defs>
                        <linearGradient id="borderGradient">
                            <stop offset="0%"  stopColor="#02c0fd"/>
                            <stop offset="30%" stopColor="#fecf03"/>
                            <stop offset="100%" stopColor="#fd504f"/>
                        </linearGradient>
                    </defs>
                    <g>
                        <rect className="border-rect" width={width.toString()} height="52" rx="18" ry="18" x="1" y="1"/>

                    </g>

                </svg>
                </div>}

                <div className="loader-wrapper" style={{visibility: !this.state.sendLoading ? "hidden" :"visible"}}>
                    <Loader/>
                </div>
            </div>
        )
    }
}