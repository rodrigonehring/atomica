import {
  START_LOADING,
  STOP_LOADING,
  AUTH_LOGIN,
  AUTH_STATUS,
} from './types';

import Axios from 'axios'
import { createAction } from 'redux-actions'
import {batchActions, enableBatching} from 'redux-batched-actions'

var axios = Axios.create({
  baseURL: 'http://localhost:5000/api-v2/',
  timeout: 1000,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
});

export const startLoading = () => ({
  type: START_LOADING
});

export const stopLoading = () => ({
  type: STOP_LOADING
});

let insertUser = createAction('INSERT_USER', user => user);
let removeUser = createAction('REMOVE_USER', user => user);

export let openLogin = createAction('OPEN_LOGIN');
export let closeLogin = createAction('CLOSE_LOGIN');

export const authLogin = (data) => {
	return dispatch => {
		dispatch(startLoading())
		return axios.post('login', data)
			.then(res => dispatch(batchActions([
				insertUser(res.data),
				stopLoading(),
				closeLogin()
			])))
			.catch(res => dispatch(stopLoading()))
	}
}

export const authStatus = () => {
	return dispatch => {
		dispatch(startLoading())
		return axios.get('status')
			.then(res => dispatch(batchActions([
				insertUser(res.data),
				stopLoading()
			])))
			.catch(res => dispatch(stopLoading()))
	}
}

export const authLogout = () => {
	return dispatch => {
		dispatch(startLoading())
		return axios.get('logout')
			.then(res => dispatch(batchActions([
				removeUser(),
				stopLoading()
			])))
			.catch(res => dispatch(stopLoading()))
	}
}
