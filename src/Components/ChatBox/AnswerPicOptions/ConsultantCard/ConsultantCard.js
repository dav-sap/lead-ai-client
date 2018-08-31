import React, { Component } from 'react';
import './consultant-card.css'
export default class ConsultantCard extends Component {

    state = {
        hover:false
    };

    render() {
        return (

            <div className="consultant-card" onClick={ () => {setTimeout( () => this.props.onClick(this.props.info), 40);}}>
                {this.props.info.imgPath ?
                    <div className="consultant-img-wrapper"  style={{top: this.state.hover ? "-5px" : "0"}}>
                    <img className="consultant-img" alt="Consultant" onMouseEnter={() => this.setState({hover:true})} onMouseLeave={() => this.setState({hover:false})}
                        src={this.props.info.imgPath}/>
                <div className="glow-low" style={{filter: this.state.hover ? "blur(6.2px)" : "blur(0)"}}/>
                <div className="glow-high" style={{filter: this.state.hover ? "blur(16px)" : "blur(0)"}}/>
            </div>  : ""}
            <div className="consultant-name">{this.props.info.name}</div>

            </div>
        );
    }
}