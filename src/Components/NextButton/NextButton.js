import React from 'react';
import './next-button.css'

const NextButton = (props) => {
	return (
		<div className={"next-button-wrapper " + (props.buttonClass ? props.buttonClass : "")}
			  style={{width: props.width, cursor: (props.disabled ? "not-allowed": "pointer	")}}>
			<svg className={"svg-border" + (props.disabled ? " next-button-disabled": "")} width={props.width + 2} onClick={props.onClick}>
				<defs>
					<linearGradient id="borderGradient">
						<stop offset="0%"  stopColor="#02c0fd"/>
						<stop offset="30%" stopColor="#fecf03"/>
						<stop offset="100%" stopColor="#fd504f"/>
					</linearGradient>
				</defs>
				<g>
					<rect className="border-rect" width={props.width} height="52" rx="18" ry="18" x="1" y="1">
					</rect>
					<text className="button-text" x="50%" y="52%" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle">
						{props.text}
					</text>
				</g>
			</svg>
			<div className="button-shadow"/>
		</div>
	);
};

export default NextButton;