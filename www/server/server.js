import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser'
import Axios from 'axios'
import proxy from 'http-proxy-middleware'

var axios = Axios.create({
  baseURL: 'http://localhost:5000/api-v2/',
  timeout: 1000,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
});



import {
  webpackMiddleware,
  webpackHotMiddleware
} from './middleware/webpackMiddleware';

import reactMiddleware from './middleware/reactMiddleware';

const DEBUG = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const server = express();

server.use(cookieParser())

server.use(function(req, res, next) {
    global.navigator = {
        userAgent: req.headers['user-agent']
    }
    next();
});





// server.use((req,res,next) => {
// 		console.log(req.cookies['connect.sid'])

// 	axios.get('status').then(res => {
// 		console.log(res.data)
// 		req.user = res.data
// 		next()
// 	})
// })

  server.use('/uploads', proxy({target: 'http://127.0.0.1:5000/'}));

  server.use(webpackMiddleware);
if (DEBUG) {
  server.use(webpackHotMiddleware);
}

server.use(compression());
server.use(express.static(path.resolve(__dirname, '../build')));
server.use('/public', express.static('public'));
server.use(express.static('build'));
server.use(morgan(DEBUG ? 'dev' : 'combined'));
server.use(reactMiddleware);

server.listen(PORT, () =>
  console.info(`Server running in ${server.get('env')} on port ${PORT}`)
);
