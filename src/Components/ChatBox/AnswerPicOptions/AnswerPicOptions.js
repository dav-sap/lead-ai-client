import React, { Component } from 'react';
import Loader from "../Loader";
import './consultants.css';
import ConsultantCard from "../ConsultantCard/ConsultantCard";

export default class AnswerPicOptions extends Component {

    state = {
        sendLoading: false,
        hover: false
    };
    consultantClicked = (consultant)=> {
        try {
            let audio = document.getElementById("audio-next");
            audio.play();
            this.setState({sendLoading: true});
            this.props.history.push({pathname:'/chat/' + consultant.name,state: { name: consultant.name, email:consultant.email }}); 
            this.props.chooseConsultant(consultant.name);
        } catch (err) {
            console.error(err);
        }
    }

    render() {

        return (
            <div className="pic-options-wrapper">
                { !this.state.sendLoading ?
                    <div className="pics-wrapper">
                        {this.props.data.map( (consultant, index) =>
                            <ConsultantCard info={consultant} key={index} onClick={this.consultantClicked}/>
                        )}
                    </div> :

                    <Loader/>}
            </div>
        )
    }
}