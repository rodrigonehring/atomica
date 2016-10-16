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
import Avatar from 'material-ui/Avatar';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';

import {connect} from 'react-redux';
import * as actionCreators from '../../actions'
import { bindActionCreators } from 'redux'

import { browserHistory } from 'react-router' 


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
    this.state = {
      email: '',
      email2: '',
      password: '',
      password2: '',
      password3: '',
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

  handleSubmit2 = e => {
    e.preventDefault()

    this.props.actions.authCreate({email: this.state.email2, password: this.state.password2, password2: this.state.password3})

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

    const actions2 = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.props.actions.closeLogin}
      />,
      <FlatButton
        label="Entrar"
        primary={true}
        onTouchTap={this.handleSubmit2}
      />,
    ];


    const {user} = this.props.auth

    const goToUrl = url => event => {
        event.preventDefault();
        browserHistory.push(url)
      }

    const adminMenu = () => (
      <div>
        <Divider />
        <MenuItem primaryText="News" onClick={goToUrl('/admin/news')} />
        <MenuItem primaryText="Users" onClick={goToUrl('/admin/users')} />
      </div>
    )

    const TopBar = () => (
      <AppBar
          title={user.email}
          iconElementLeft={<Avatar
                       src={this.props.auth.user.img}
                  />}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Preferencias" />
              


              {user.admin ? 
                  adminMenu()
                : ''}
                
              <Divider />
       
              <MenuItem primaryText="Sair" onTouchTap={this.props.actions.authLogout} />
             
            </IconMenu>
          }
        />
    )

    let loginDialog = () => (
      <div>
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
      <Dialog
        title="Criar conta"
        actions={actions2}
        className={style.modal}
        modal={false}
        open={this.props.auth.createOpen}
        onRequestClose={this.handleClose}
      >
        <TextField
          id="email2"
          hintText="username@email.com"
          className={style.input}
          value={this.state.email1}
          onChange={this.handleChange}
          floatingLabelText="E-mail"
        /><br />

        <TextField
          id="password2"
          className={style.input}
          type="password"
          onChange={this.handleChange}
          value={this.state.password2}
          hintText="******"
          floatingLabelText="Senha"
        /><br />

        <TextField
          id="password3"
          className={style.input}
          type="password"
          onChange={this.handleChange}
          value={this.state.password3}
          hintText="******"
          floatingLabelText="Repetir senha"
        /><br />
      </Dialog>
      </div>
    )



    return (
      <div>
        {user.email ? 
          TopBar() :
          loginDialog()
        }
        

        
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
