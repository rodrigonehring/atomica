import Axios from 'axios'
import { browserHistory } from 'react-router'
const url = !process.env.HOME ? window.PATH : '';
console.log(url);
const axios = Axios.create({
  baseURL: url,
  timeout: 1000,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'},
});

axios.interceptors.response.use(function (response) {
	return response;
	}, function (error) {
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

export default axios;
