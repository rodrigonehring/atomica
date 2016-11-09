import React, { Component } from 'react';

export default class extends Component {

	constructor(props) {
		super(props);
		this.state = {
			btnActive: false,
			message: '',
		}
	}

	onChange(e) {
		if (!e.target.value)
			return this.clear();

		this.setState({
			...this.state,
			message: e.target.value,
		});
	}

	clear() {
		this.setState({
			btnActive: false,
			message: '',
		});
	}

	onSubmit(e) {
		e.preventDefault();
		console.log('submited');
		this.props.add(this.state.message).then(() => {
			this.clear();
		});
	}

	render() {
		return ( <div>
			<form onSubmit={this.onSubmit.bind(this)}>
				<input type="text" name="message" onChange={this.onChange.bind(this)} value={this.state.message} />
				<button type="sumbit">Enviar</button>
			</form>
		</div>)
	}
}
