import React, { Component } from 'react';
import Loader from "./Loader";


export default class AnswerPicOptions extends Component {

    state = {
        sendLoading: false
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
                        <div className="consultant-card" key={index} onClick={() => this.consultantClicked(consultant)}>
                            {consultant.imgPath ?
                                <div className="consultant-img-wrapper">
                                    <img className="consultant-img" alt="Consultant" src={consultant.imgPath}/>
                                </div>  : ""}
                                <div className="consultant-name">{consultant.name}</div>
                        </div>)
                    }
                    </div> :

                    <Loader/>}
            </div>
        )
    }
}