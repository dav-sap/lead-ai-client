import React from 'react';
import './checkbox-button.css'

const CheckBoxButton = (props) => {
	return (
		<div className="radio-button" onClick={() => props.onClick(props.value)}>
			<a className={"checkbox colored dark green " + (props.checked ? "triggered" : "")}>
				<svg viewBox="0 0 20 20">
					<polyline points="4.2,9.5 8.6,15.5 15,2.5"/>
				</svg>
			</a>

			<div className="radio-button-text">
				{props.value}
			</div>
		</div>
	)
}

export default CheckBoxButton;