import React, {PureComponent} from 'react';
import Confetti2 from 'react-dom-confetti';

const config = {
	angle: 90,
	spread: 60,
	startVelocity: 20,
	elementCount: 30,
	decay: 0.95
};

class CompletionStage extends PureComponent {

	state = {
		shootConfetti: false,
	}

	changeShootConfetti = ()=> {
		if (!this.state.shootConfetti) {

			try {
				window.navigator.vibrate(40);
			} catch (err) {
				console.error(err);
			}
			this.setState({
				shootConfetti: true
			});
		}
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.state.shootConfetti) {
			setTimeout(() => this.setState({
				shootConfetti: false
			}), 1000)
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.changeShootConfetti()
		}, 700)
	}


	render() {
		return (
			<div>
				<div className="end-image-wrapper no-select" onClick={this.changeShootConfetti}>
					<div className="glow-image-end"/>
					<img className="end-img" alt="" src="/images/hands.png" />

					<div style={{position: "absolute", top: "50%", left: "50%"}}>
					<Confetti2 active={ this.state.shootConfetti } config={ config } />
					</div>
				</div>
			</div>
		);
	}
}


export default CompletionStage;