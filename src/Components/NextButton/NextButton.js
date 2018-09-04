import React from 'react';
import './next-button.css'

const NextButton = (props) => {
	return (
		<div className={"next-button-wrapper " + (props.buttonClass) + (props.disabled ? " next-button-disabled" : "")} style={{width: props.width}}>
			<button className="submit-button no-select" onClick={props.onClick}
					disabled={props.disabled}
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