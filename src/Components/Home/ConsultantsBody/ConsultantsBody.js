import React, { Component } from 'react';
import './consultants.css'
import ConsultantCard from "../ConsultantCard/ConsultantCard";
import {TITLES} from "../../Consts";

export default class ConsultantsBody extends Component {


    error = "";


    render() {
        return (

            <div className="consultants">
                <div className="consultant-title">{TITLES.CONSULTANT_TITLE}
                    <img alt="arrow" src="images/arrow.png" className="arrow"/>
                </div>
                <div className="cards-wrapper">
                    {this.props.consultants.map((consultant, index) =>
                        <ConsultantCard closeScreen={this.props.closeScreen} key={index} info={consultant} history={this.props.history}/>)}
                </div>
            </div>
        );
    }
}