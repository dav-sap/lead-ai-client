import React from 'react';
import './next-button.css'

const NextButton = (props) => {
	console.log(props);
	return (
		<div className={"home-start-button-wrapper " + (props.buttonClass)} style={{width: props.width, opacity: props.disabled ? 0.5 : 1}}>
			<button className="submit-button no-select" onClick={ props.disabled ? null : props.onClick}
					style={{cursor: props.disabled ? "not-allowed" : "pointer", width: (props.width - 2).toString() + ".2px"}}>
				<div className="button-text">
					{props.text}
				</div>
			</button>
			<svg className="svg-border" width={props.width + 2}>
				<defs>
					<linearGradient id="borderGradient">
						<stop offset="0%"  stopColor="#02c0fd"/>
						<stop offset="30%" stopColor="#fecf03"/>
						<stop offset="100%" stopColor="#fd504f"/>
					</linearGradient>
				</defs>
				<g>
					<rect className="border-rect" width={props.width} height="52" rx="18" ry="18" x="1" y="1"/>
				</g>
			</svg>
			<div className="button-shadow"/>
		</div>
	);
};

export default NextButton;