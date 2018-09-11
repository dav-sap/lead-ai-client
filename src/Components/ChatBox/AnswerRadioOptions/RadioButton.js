import React from 'react';
import "./radio-button.css";

const RadioButton = (props) => {
	return (
		<div className="radio-button" onClick={() => props.onClick(props.value)}>
			<div className={"radio-button-indicator " + (props.checked ? "radio-indicator-chosen" : "")}>
				<img className={"checkmark-img " + (props.checked ? "indicator-chosen" : "")} src="data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E"/>
			</div>

			<div className="radio-button-text">
				{props.value}
			</div>
		</div>
	)
}

export default RadioButton;