import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './actions';
import { bindActionCreators } from 'redux';
import List from './list';
import Send from './send';

class Chat extends Component {
	constructor(props) {
		super(props);
		this.elList = null;
		console.log(props);
	}

	componentDidMount() {
		this.props.actions.getMessages();
	}

	componentDidUpdate({ chat }) {
		this.scroll();
	}

	scroll() {
		if (!this.elList)
			this.elList = document.querySelector('.chat-list');
		this.elList.scrollTop = 100000;
	}

	render() {
		const { deleteSingle, deleteAll, addMessage } = this.props.actions;
		const isAdmin = this.props.auth.user.admin;

		const options = {
			isAdmin: this.props.auth.user.admin,
			user: this.props.auth.user,
		};

		return (
			<div>
				<List items={this.props.chat.messages} deleteSingle={deleteSingle} isAdmin={isAdmin} />
				<Send {...options} add={addMessage} deleteAll={deleteAll}  />
			</div>
		)
	}
}

// export default Chat;
export default connect(state => ({
	chat: state.chat,
	auth: state.auth,
}), dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch),
}))(Chat);
