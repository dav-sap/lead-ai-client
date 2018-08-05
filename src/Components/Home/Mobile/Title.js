import React, {Component} from "react";
import {TITLES} from "../../Consts";
import './title.css'
export default class MobileTitle extends Component {

    render() {
        return (
            <div className="mobile-title">
                <div className="angel-img-wrapper">
                    <img className="floating-head" alt="" src="/images/floating-thing.png"/>
                    <img className="angel" alt="" src="/images/angel.png"/>
                </div>
                <div className="mobile-top-title">
                    {TITLES.TOP}
                </div>
                <div className="mobile-sub-title">
                    {TITLES.MOBIE_MIDDLE}
                </div>
                <img className="brush-stroke" alt="" src="/images/brush-stroke.png"/>
            </div>
        )
    }
}