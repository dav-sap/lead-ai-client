import React from 'react';
import "./radio-button.css";

const RadioButton = (props) => {
	return (
		<div className="radio-button" onClick={() => props.onClick(props.value)}>
			<div className="radio-button-indicator">
				<div className={"radio-button-indicator-inside " + (props.chosen === props.value ? "indicator-chosen" : "")}/>
			</div>

			<div className="radio-button-text">
				{props.value}
			</div>
		</div>
	)
}

export default RadioButton;