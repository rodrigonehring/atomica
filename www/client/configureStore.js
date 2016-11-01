import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {batchActions, enableBatching} from 'redux-batched-actions';

import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default (initialState) =>
  createStore(
    enableBatching(reducer),
    initialState,
  	compose(
  	    applyMiddleware(thunk),
  	    applyMiddleware(sagaMiddleware)
  	  ),
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : (f) => f
  );

