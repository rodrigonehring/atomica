import {
  IndexRoute,
  Route,
  Router,
  browserHistory
} from 'react-router';

import React from 'react';

import App from './components/App';
import Home from './components/Home';
import AdminUsers from './components/admin/listUsers';
import AdminNews from './components/admin/news';
import Chat from './components/chat';

import SinglePost from './components/news/single';


import NotFound from './components/NotFound';

export default (
  <Router history={browserHistory}>
    <Route component={App} path='/'>
      <IndexRoute component={Home} />
      <Route component={AdminUsers} path='/admin/users' />
      <Route component={AdminNews} path='/admin/news' />
      
      <Route component={SinglePost} path='/posts/read/:postSlug' />
      <Route component={Chat} path='/chat' />


      <Route component={NotFound} isNotFound path='*' />
    </Route>
  </Router>
);
