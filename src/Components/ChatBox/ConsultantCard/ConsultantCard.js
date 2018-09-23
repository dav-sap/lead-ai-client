import React, { Component } from 'react';
import './consultant-card.css'
import Star from "./Star";

export default class ConsultantCard extends Component {

	state = {
		opacity: 0
	}

	componentDidMount() {
		setTimeout(() => this.setState({
			opacity: 1
		}), 2000)
	}

	render() {
        return (

            <div className="consultant-card" style={{opacity: this.state.opacity}}>
				<div className="consultant-img-wrapper" >
					<img className="consultant-img" alt="Consultant" src={this.props.imgPath}/>
					<div className="glow-low" style={{filter: "blur(6.2px)"}}/>
					<div className="glow-high" style={{filter: "blur(16px)"}}/>
				</div>
				<div className="ratings-wrapper">
					{[...Array(5)].map((one, index) =>
						<Star key={index}/>
					)}
				</div>
            </div>
        );
    }
}