import React, { PureComponent } from 'react';
import './answer-input.css'
import NextButton from "../../NextButton/NextButton";
import Loader from "../Loader";
import {INPUT_HELPER_FUNCTIONS} from "../../Utils";

export default class AnswerInput extends PureComponent {

	constructor(props) {
		super(props)

		this.state = {
			inputText: "",
			focus: false,
			sendLoading: false,
		};
		this.helperFunctions = INPUT_HELPER_FUNCTIONS[this.props.answer.inputName];
	}



    handleKeyDown = (event) => {
        if ((event.which === 13 || event.keyCode === 13) && this.helperFunctions.validateSubmit(this.state.inputText)) {
            this.disableInput = true;
            this.handleSubmit();
            document.getElementById("textbox").blur()
        }
    };

	handleSubmit = () => {
		try {
			let audio = document.getElementById("audio-next");
			audio.play();
			// this.props.disableError();

			if (this.state.inputText !== "") {
				this.setState({sendLoading: true});
				this.props.onSubmit(this.state.inputText);
			}
		} catch (err) {
			console.error(err);
		}
	};

    inputChange = (event) => {
        if (!this.disableInput && this.helperFunctions.validator(event.target.value)) {
            this.setState({
                inputText: this.helperFunctions.changeString(this.state.inputText, event.target.value)
            }, () => {
                let el = document.getElementById("textbox");
                if (typeof el.selectionStart === "number") {
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

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.error) {
			return {
				sendLoading: false
			}
		}
		return null;
	}

    render() {
    	console.log(this.helperFunctions.validateSubmit(this.state.inputText));
        return <div className="input-wrapper" >
            <fieldset style={{position: "relative", marginBottom: "25px"}}>

                <input type={this.props.answer.inputType}
                          placeholder={this.state.focus ? "" : this.props.answer.placeholder}
                          value={this.state.inputText} onFocus={() => this.setState({focus: true})} onBlur={() => this.setState({focus: false})}
                          style={{direction: this.props.answer.dir}}
                          className="user-input" onKeyDown={this.handleKeyDown}
                          onChange={this.inputChange} id="textbox"/>

                <div className="text-input" />
            </fieldset>
			{!this.state.sendLoading ?
				<NextButton width={203} text={"הבא"} onClick={this.handleSubmit}
						   buttonClass="lone-button" disabled={!this.helperFunctions.validateSubmit(this.state.inputText)}/>
				: <Loader/> }
        </div>
    }
}