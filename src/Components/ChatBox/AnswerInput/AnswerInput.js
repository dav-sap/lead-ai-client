import React, { Component } from 'react';
import './answer-input.css'
import NextButton from "../NextButton/NextButton";

export default class AnswerInput extends Component {
    state = {
        inputText: "",
        enterClicked: false,
        focus: false,
    };


    handleKeyDown = (event) => {
        if ((event.which === 13 || event.keyCode === 13) && this.props.answerNode.data().validateSubmit(this.state.inputText)) {
            this.disableInput = true;
            this.setState({
                enterClicked: true
            })
            document.getElementById("textbox").blur()
        }
    };
    
    inputChange = (event) => {
        if (!this.disableInput && this.props.answerNode.data().validator(event.target.value)) {
            this.setState({
                inputText: this.props.answerNode.data().changeString(this.state.inputText, event.target.value)
            }, () => {
                let el = document.getElementById("textbox");
                if (typeof el.selectionStart == "number") {
                    el.selectionStart = el.selectionEnd = el.value.length;
                } else if (typeof el.createTextRange !== "undefined") {
                    el.focus();
                    var range = el.createTextRange();
                    range.collapse(false);
                    range.select();
                }
            })
        }

    };

    render() {
    
        return <div className="input-wrapper" >
            <fieldset style={{position: "relative", marginBottom: "25px"}}>

                <input type={this.props.currentNode.childNodes()[0].data().inputType}
                          placeholder={this.state.focus ? "" : this.props.currentNode.childNodes()[0].data().placeholder}
                          value={this.state.inputText} onFocus={() => this.setState({focus: true})} onBlur={() => this.setState({focus: false})}
                          style={{direction: this.props.answerNode.data().dir ? this.props.answerNode.data().dir : "rtl"}}
                          className="user-input" onKeyDown={this.handleKeyDown}
                          onChange={this.inputChange} id="textbox"/>

                <div className="text-input" />
            </fieldset>
            <NextButton inputText={this.state.inputText} currentNode={this.props.currentNode} disableError={this.props.disableError} nextButton={true} content={"הבא"} error={this.props.error}
                        answerNode={this.props.answerNode} createUser={this.props.createUser} addDataToDB={this.props.addDataToDB} enterClicked={this.state.enterClicked}/>

        </div>
    }
}