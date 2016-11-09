import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import socket from 'socket.io-client';
import { createAction } from 'redux-actions'
import {batchActions, enableBatching} from 'redux-batched-actions';

import reducer from './reducers';

const io = socket('http://localhost:5000');

// io.on('connect', () => {
// 	console.log('client connected');
// })

function createSocketIoMiddleware(socket, criteria = [],
  { eventName = 'action', execute = defaultExecute } = {}) {
  const emitBound = socket.emit.bind(socket);
  return ({ dispatch }) => {
    // Wire socket.io to dispatch actions sent by the server.
    socket.on(eventName, ({ type, data }) => dispatch(createAction(type, data => data)(data)));
    return next => action => {
      if (evaluate(action, criteria)) {
        execute(action, emitBound, next, dispatch);
      } else {
        next(action);
      }
    };
  };

  function evaluate(action, option) {
    const { type } = action;
    let matched = false;
    if (typeof option === 'function') {
      // Test function
      matched = option(type, action);
    } else if (typeof option === 'string') {
      // String prefix
      matched = type.indexOf(option) === 0;
    } else if (Array.isArray(option)) {
      // Array of types
      matched = option.some((item) => type.indexOf(item) === 0);
    }
    return matched;
  }

  function defaultExecute(action, emit, next, dispatch) { // eslint-disable-line no-unused-vars
    emit(eventName, action);
    next(action);
  }
}

export default (initialState) =>
  createStore(
    enableBatching(reducer),
    initialState,
  	compose(
  	    applyMiddleware(thunk),
  	    applyMiddleware(
  	      createSocketIoMiddleware(io)
  	    )
  	  ),
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : (f) => f
  );

