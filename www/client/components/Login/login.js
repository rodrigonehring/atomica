import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import {connect} from 'react-redux';
import * as actionCreators from '../../actions'
import { bindActionCreators } from 'redux'

import style from './auth.css'

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class Auth extends React.Component {
  constructor(props) {
    super(props)
    props.actions.authStatus()
    console.log(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = ({target}) => {
    this.setState({
      ...this.state,
      [target.id] : target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.actions.authLogin({email: this.state.email, password: this.state.password})

    console.log(this.state)
  }

  handleStatus = e => {
    e.preventDefault()
    this.props.actions.authStatus()
  }

  handleLogout = e => {
    e.preventDefault()
    this.props.actions.authLogout()
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.props.actions.closeLogin}
      />,
      <FlatButton
        label="Entrar"
        primary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];



    return (
      <div>
        <AppBar
            title="Title"
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Refresh" onTouchTap={this.props.actions.openLogin} />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
              </IconMenu>
            }
          />
        <RaisedButton label="Entrar" onTouchTap={this.props.actions.openLogin} />
        <RaisedButton label="Status" onTouchTap={this.handleStatus} />
        <RaisedButton label="Logout" onTouchTap={this.handleLogout} />

        {this.props.auth.user ? this.props.auth.user.email : ''}

        <Dialog
          title="Login"
          actions={actions}
          className={style.modal}
          modal={false}
          open={this.props.auth.loginOpen}
          onRequestClose={this.handleClose}
        >
          <TextField
            id="email"
            hintText="username@email.com"
            className={style.input}
            value={this.state.email}
            onChange={this.handleChange}
            floatingLabelText="E-mail"
          /><br />

          <TextField
            id="password"
            className={style.input}
            type="password"
            onChange={this.handleChange}
            value={this.state.password}
            hintText="******"
            floatingLabelText="Senha"
          /><br />

        </Dialog>
      </div>
    );
  }
}

Auth.propTypes = {
  auth: PropTypes.object,
  actions: PropTypes.object,
};

const mapStateToProps = ({auth}) => ({
  auth: auth
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
