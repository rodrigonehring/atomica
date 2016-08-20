import {combineReducers} from 'redux';

import appState from './appState';
import news from './news';
import auth from './auth';

export default combineReducers({
  appState,
  auth,
  news
});
