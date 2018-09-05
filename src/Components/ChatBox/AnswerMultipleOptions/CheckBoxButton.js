import React from 'react';
import './checkbox-button.css'

const CheckBoxButton = (props) => {
	return (
		<div className="radio-button" onClick={() => props.onClick(props.value)}>
			<div className="checkbox">
				<div className={(props.checked ? "checkbox-checked" : "")}/>
				{props.checked ?
					<span className="checkmark">
						<div className="checkmark_stem"/>
						<div className="checkmark_kick"/>
					</span>
				: ""}
			</div>

			<div className="radio-button-text">
				{props.value}
			</div>
		</div>
	)
}

export default CheckBoxButton;