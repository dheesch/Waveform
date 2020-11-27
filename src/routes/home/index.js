import { Component, render } from 'preact';
import style from './style.css';
import Waveform from '../../components/waveform'

class Home extends Component {

	constructor() {
		super()
		this.state = {
			shouldRun: false
		}
	}

	toggleRenderLoop() {
		this.setState({
			shouldRun: !this.state.shouldRun
		})
		console.log(this.state.shouldRun)
	}

	render({ }, { shouldRun }) {
		return <div class='content-container'>
			<div class='left' id='waveform-container'>
				<Waveform start={shouldRun} />
			</div>
			<div class='right'>
				<button class='btn' onClick={this.toggleRenderLoop.bind(this)}> Start </button>
			</div>
		</div>
	}
}

export default Home;
