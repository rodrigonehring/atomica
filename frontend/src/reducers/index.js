import {combineReducers} from 'redux';

import appState from './appState';
import news from './news';
import auth from './auth';
import NewsDialog from '../components/admin/NewsDialog/reducer';
import chat from '../components/chat/reducer';

export default combineReducers({
  appState,
  auth,
  news,
  NewsDialog,
  chat,
});
