import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import * as actionCreators from '../../actions'
import { bindActionCreators } from 'redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import CircularProgress from 'material-ui/CircularProgress';

import Auth from '../Login/login'

import SidebarLeft from '../SidebarLeft/Sidebar';
import Player from '../player/player';

import style from './App.css';

const Loading = ({loading}) => {
  if (loading) 
    return (
      <div className={style.loading}>
        <CircularProgress size={2} />
      </div>
    )
  return null
}

export const App = ({children, loading, user, actions}) => (
  <MuiThemeProvider>
    <div className={style.root}>
      <Helmet titleTemplate='%s - React Starter' />

      <Auth />

      <Loading loading={loading} />

      <SidebarLeft />
      <div className={style.content}>      	
      	{children}
      </div>
      <Player />
    </div>
  </MuiThemeProvider>
);



App.propTypes = {
  children: PropTypes.object,
  loading: PropTypes.bool,
  user: PropTypes.object,
  actions: PropTypes.object,
};

const mapStateToProps = ({appState}) => ({
  loading: appState.loading,
  user: appState.user
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
