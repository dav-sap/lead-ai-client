
import React, { Component } from 'react';
import './header.css'

export default class MobileHeader extends Component {
    render() {
        return (
            <div className="mobile-header-chat">
                <div className="status-wrapper">
                    <div className="dot-wrapper">
                        <div className="status-glow"/>
                        <div className="status-dot"/>
                    </div>
                    <div className="status">
                        Connected
                    </div>
                </div>
            </div>
        )

    }
}