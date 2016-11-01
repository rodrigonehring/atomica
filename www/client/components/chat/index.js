import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './actions';
import { bindActionCreators } from 'redux';
import List from './list';
import Send from './send';

class Chat extends Component {
	constructor(props) {
		super(props);
		console.log(props.chat);
	}

	componentDidMount() {
		this.props.actions.getMessages();
	}

	render() {
		return (
			<div>
				<List items={this.props.chat.messages} />
				<Send add={this.props.actions.addMessage} />
			</div>
		)
	}
}

// export default Chat;
export default connect(state => ({
	chat: state.chat,
}), dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch),
}))(Chat);
