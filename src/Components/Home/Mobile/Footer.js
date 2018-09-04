import React, {Component} from "react";
import './footer.css'
export default class MobileFooter extends Component {

    nextClicked = () => {
        try {
            let audio = document.getElementById("audio-next");
            audio.play();
            this.props.startChat();
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <div className="mobile-footer">
                <button className="start-chat-button" onClick={this.nextClicked}>
                    <div className="start-chat-button-wrapper">
                    <div className="start-chat-button-text">
                        התחל ייעוץ בחינם
                    </div>
                    <img className="arrow-next" alt="next" src="/images/arrow_mobile.png"/>
                    </div>
                </button>
            </div>
        )
    }
}