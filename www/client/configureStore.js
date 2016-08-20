import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {batchActions, enableBatching} from 'redux-batched-actions';

import reducer from './reducers';

export default (initialState) =>
  createStore(
    enableBatching(reducer),
    initialState,
    applyMiddleware(thunk),
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : (f) => f
  );
