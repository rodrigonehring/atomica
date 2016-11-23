import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

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

	onSubmit(e, type) {
		e.preventDefault();
		this.send(this.state.message, 'message');
	}

	send(message, type) {
		return this.props.add(message, type).then(() => {
			this.clear();
		});
	}

	render() {
		const { user, isAdmin, deleteAll } = this.props;

		const formulario = (
			<form onSubmit={this.onSubmit.bind(this)} style={{marginTop: 25, marginBottom: 25}}>
				<TextField
					style={{marginRight: 25}}
					name="message"
					hintText="Mensagem"
					onChange={this.onChange.bind(this)}
					value={this.state.message}
			    />
				<RaisedButton 
					type="sumbit"
					label="Enviar"
					disabled={!this.state.message}
					primary={true}
				/>
				<RaisedButton
					label="Enviar aviso como admin"
					disabled={!this.state.message}
					primary={true}
					onClick={() => this.send(this.state.message, 'admin')}
				/>
			</form>
		);

		const messageLogin = 'Você precisa estar logado para enviar mensagens!';

		return ( 
			<div>
				{user && user.email ? formulario : messageLogin}
				{isAdmin &&
					<RaisedButton label="DELETAR TODAS AS MENSAGENS!" onClick={() => this.props.deleteAll()} />
				}
		</div>)
	}
}
