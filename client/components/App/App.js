import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import SidebarLeft from '../SidebarLeft/Sidebar';
import Player from '../player/player';

import style from './App.css';

export const App = ({children, loading}) => (
  <div className={style.root}>
    <Helmet titleTemplate='%s - React Starter' />
    <SidebarLeft />
    <div className={style.content}>
    	{loading && 'Loading...'}
    	{children}
    </div>
    <Player />
  </div>
);

App.propTypes = {
  children: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = ({appState}) => ({
  loading: appState.loading
});

export default connect(mapStateToProps)(App);
