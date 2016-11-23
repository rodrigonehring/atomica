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
import Snackbar from 'material-ui/Snackbar'


import SidebarLeft from '../SidebarLeft/Sidebar';
import Player from '../player/player';

import style from './App.css';

const Loading = ({loading}) => {
  if (loading) 
    return (
      <div className={style.loading}>
        <CircularProgress size={60} />
      </div>
    )
  return null
}

export const App = ({children, loading, user, snackbar, actions}) => (
  <MuiThemeProvider>
    <div className={style.root}>
      <Helmet titleTemplate='%s - React Starter' />

      <Auth />

      <Loading loading={loading} />

      <SidebarLeft user={user} actions={actions}/>
      <div className={style.content}>      	
      	{children}
      </div>
      <Player />
       <Snackbar
          open={snackbar.open}
          className={style.snackbar}
          message={snackbar.message}
          onRequestClose={() => actions.snackClose()}
          autoHideDuration={4000}
        />
    </div>
  </MuiThemeProvider>
);



App.propTypes = {
  children: PropTypes.object,
  loading: PropTypes.bool,
  user: PropTypes.object,
  snackbar: PropTypes.object,
  actions: PropTypes.object,
};

const mapStateToProps = ({appState, auth}) => ({
  loading: appState.loading,
  user: auth.user,
  snackbar: appState.snackbar
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
