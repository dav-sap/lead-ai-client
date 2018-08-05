import React, { Component } from 'react';
import {TITLES} from './../../Consts';
import './title.css';
export default class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="title">
                <div className="header-title">{TITLES.TOP}</div>
                <div className="header-sub-title">{TITLES.MIDDLE}</div>
            </div>
        );
    }
}