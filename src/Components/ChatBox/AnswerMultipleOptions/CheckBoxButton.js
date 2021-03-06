import React from 'react';
import './checkbox-button.css'

const CheckBoxButton = (props) => {
	return (
		<div className={"radio-button " + (props.checked ? "radio-button-checked" : "")} onClick={() => props.onClick(props.value)}>
			<a className={"checkbox colored dark green " + (props.checked ? "triggered" : "")}>
				<svg viewBox="0 0 20 20">
					<polyline points="5.2,10.5 8.5,14.5 14.6,6.5"/>
				</svg>
			</a>

			<div className="radio-button-text">
				{props.value}
			</div>
		</div>
	)
}

export default CheckBoxButton;