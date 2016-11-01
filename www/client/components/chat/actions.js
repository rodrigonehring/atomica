import { createAction } from 'redux-actions'
import { batchActions } from 'redux-batched-actions'


import http from '../../http'

const getMessagesSuccess = createAction('GET_MESSAGES_SUCCESS', messages => messages);
const addMessagesSuccess = createAction('ADD_MESSAGES_SUCCESS', messages => messages);

export function getMessages() {
	return dispatch => {
		return http.get('chat').then(({ data }) => {
			dispatch(getMessagesSuccess(data));
		})
	}
}

export function addMessage(message) {
	return dispatch => {
		return http.post('chat', { message }).then(res => {
			console.log('res');
			return dispatch(addMessagesSuccess(res));
		})
	}
}
