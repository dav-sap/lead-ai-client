import React, {Component} from "react";
import {TITLES} from "../../Consts";
import './footer.css'
export default class MobileFooter extends Component {

    nextClicked = () => {
        try {
            let audio = document.getElementById("audio-next");
            audio.play();
            this.props.closeScreen(true);
        } catch (err) {
            console.error(err);
        }
    }
    render() {
        return (
            <div className="mobile-footer">
                <button className="next-button" onClick={this.nextClicked}>
                    <div className="next-button-wrapper">
                    <div className="next-button-text">
                        התחל ייעוץ בחינם
                    </div>
                    <img className="arrow-next" src="/images/arrow_mobile.png"/>
                    </div>
                </button>
            </div>
        )
    }
}