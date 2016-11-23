import { createAction } from 'redux-actions'
import { batchActions } from 'redux-batched-actions'


import http from '../../http'

const getMessagesSuccess = createAction('GET_MESSAGES_SUCCESS', messages => messages);
const addMessagesSuccess = createAction('ADD_MESSAGES_SUCCESS', messages => messages);
const deletedSingle = createAction('CHAT_DELETED_SINGLE', id => id);
const deletedAll = createAction('DELETED_ALL');

export function getMessages() {
	return dispatch => {
		return http.get('chat').then(({ data }) => {
			dispatch(getMessagesSuccess(data));
		})
	}
}

export function addMessage(message, type) {
	return dispatch => {
		return http.post('chat', { message, type }).then(res => {
			return dispatch(addMessagesSuccess(res));
		})
	}
}

export function deleteAll() {
	return dispatch => {
		return http.delete('chat')
			.then(() => dispatch(deletedAll))
	}
}

export function deleteSingle(id) {
	return dispatch => http.delete('chat/' + id)
		.then(() => dispatch(deletedSingle(id)))
}
