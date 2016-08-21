import {
  START_LOADING,
  STOP_LOADING,
  AUTH_LOGIN,
  AUTH_STATUS,
} from './types';

import Axios from 'axios'
import { createAction } from 'redux-actions'
import {batchActions, enableBatching} from 'redux-batched-actions'
import { browserHistory } from 'react-router' 

var axios = Axios.create({
  baseURL: 'http://localhost:5000/api-v2/',
  timeout: 1000,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'},
});

axios.interceptors.response.use(function (response) {

return response;
}, function (error) {
	console.log('chegou aqui?')
	if (error.response.status == 401) {
		console.log('401',error.response)
		browserHistory.push('/')
		return Promise.reject({
			response: {
				data: {
					msg: 'REDIRECT - NAO AUTORIZADO'
				}
			}
		})
	}
		

	return Promise.reject(error);
});

export const startLoading = () => ({
  type: START_LOADING
});

export const stopLoading = () => ({
  type: STOP_LOADING
});

let usersList = createAction('USERS', users => users);

let insertUser = createAction('INSERT_USER', user => user);
let removeUser = createAction('REMOVE_USER', user => user);

export let openLogin = createAction('OPEN_LOGIN');
export let closeLogin = createAction('CLOSE_LOGIN');

export let openCreate = createAction('OPEN_CREATE');

export const authLogin = (data) => {
	return dispatch => {
		dispatch(startLoading())
		return axios.post('login', data)
			.then(res => dispatch(batchActions([
				insertUser(res.data),
				stopLoading(),
				closeLogin()
			])))
			.catch(err => handleErrors(err, dispatch))
	}
}

export const getUserList = (data) => {
	return dispatch => {
		dispatch(startLoading())
		return axios.get('users')
			.then(res => dispatch(batchActions([
				usersList(res.data),
				stopLoading()
			])))
			.catch(err => handleErrors(err, dispatch))
	}
}

export const authCreate = (data) => {
	return dispatch => {
		dispatch(startLoading())
		return axios.post('create-account', data)
			.then(res => dispatch(batchActions([
				insertUser(res.data),
				stopLoading(),
				closeLogin()
			])))
			.catch(err => handleErrors(err, dispatch))
	}
}

const deleteUserID = createAction('DELETE_USER_ID', id => id);
const updateUserID = createAction('UPDATE_USER_ID', user => user);


export const snack = createAction('SNACK', message => message);
export const snackClose = createAction('SNACK_CLOSE');


export const deleteUser = (id) => {
	console.log(id)
	return dispatch => {
		dispatch(startLoading())
		return axios.delete('users/remove/' + id)
			.then(res => dispatch(batchActions([
				deleteUserID(id),
				stopLoading()
			])))
			.catch(err => handleErrors(err, dispatch))
	}
}

export const addAdminUser = (id) => {
	console.log(id)
	return dispatch => {
		dispatch(startLoading())
		return axios.put('users/add-admin/' + id)
			.then(res => dispatch(batchActions([
				updateUserID(res.data.user),
				stopLoading()
			])))
			.catch(err => handleErrors(err, dispatch))
	}
}

export const removeAdminUser = (id) => {
	console.log(id)
	return dispatch => {
		dispatch(startLoading())
		return axios.put('users/remove-admin/' + id)
			.then(res => dispatch(batchActions([
				updateUserID(res.data.user),
				stopLoading()
			])))
			.catch(err => handleErrors(err, dispatch))
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
			.catch(err => handleErrors(err, dispatch))
	}
}

export const authLogout = () => {
	return dispatch => {
		dispatch(startLoading())
		return axios.get('logout')
			.then(res => {
				browserHistory.push('/')
				return dispatch(batchActions([
					removeUser(),
					stopLoading()
				]))
			})
			.catch(err => handleErrors(err, dispatch))
			
	}
}

///************************
///                   Posts
///************************

const posts_fetch = createAction('POSTS_FETCH', posts => posts);
const addPostList = createAction('ADD_POST_LIST', post => post);
const deletePostList = createAction('DELETE_POST_LIST', id => id);
const currentPost = createAction('CURRENT_POST', post => post);
export const clearCurrentPost = createAction('CLEAR_CURRENT_POST');

export const getPostList = () => {
	return dispatch => {
		dispatch(startLoading())
		return axios.get('posts')
			.then(res => dispatch(batchActions([
				posts_fetch(res.data),
				stopLoading()
			])))
			.catch(err => handleErrors(err, dispatch))
	}
}

export const addPost = (data) => {
	return dispatch => {
		dispatch(startLoading())
		return axios.post('posts', data)
			.then(res => {
				browserHistory.push('/admin/news')
				dispatch(batchActions([
					addPostList(res.data),
					stopLoading()
				]))
			})
			.catch(err => handleErrors(err, dispatch))
	}
}

export const deletePost = (id) => {
	return dispatch => {
		dispatch(startLoading())
		return axios.delete('posts/delete/' + id)
			.then(res => {
				dispatch(batchActions([
					deletePostList(id),
					stopLoading()
				]))
			})
			.catch(err => handleErrors(err, dispatch))
	}
}

export const getPost = (slug) => {
	return dispatch => {
		dispatch(startLoading())
		return axios.get('posts/read/' + slug)
			.then(res => {
				dispatch(batchActions([
					currentPost(res.data),
					stopLoading()
				]))
			})
			.catch(err => handleErrors(err, dispatch))
	}
}






















const handleErrors = (err, dispatch) => {
	if (err.response && err.response.data)
		return dispatch(batchActions([
				stopLoading(),
				snack(err.response.data.msg)
			]))
	return dispatch(stopLoading())
}

