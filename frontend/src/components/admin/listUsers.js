import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';
import { bindActionCreators } from 'redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import style from './style.css';



class Users extends React.Component {

  componentWillMount() {
    this.props.actions.getUserList()
  }

  render() {
    return (
      <div>
        <Helmet title='User' />
        <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn className={style.rowId}>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn className={style.rowId}>Admin</TableHeaderColumn>
                <TableHeaderColumn className={style.rowId}>Deletar</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.users.map((item, index) => (
                <TableRow key={index}>
                  <TableRowColumn className={style.rowId}>{index}</TableRowColumn>
                  <TableRowColumn>{item.email}</TableRowColumn>

                  <TableRowColumn className={style.rowId}>{item.admin ? 
                      <FloatingActionButton mini={true} secondary={true} onClick={() => this.props.actions.removeAdminUser(item._id)}>
                        <ContentRemove />
                      </FloatingActionButton>
                    : 
                      <FloatingActionButton mini={true} onClick={() => this.props.actions.addAdminUser(item._id)}>
                        <ContentAdd />
                      </FloatingActionButton>
                  }</TableRowColumn>

                  <TableRowColumn className={style.rowId}>
                      <FloatingActionButton mini={true} secondary={true} onClick={() => this.props.actions.deleteUser(item._id)}>
                        <ContentRemove />
                      </FloatingActionButton>
                  </TableRowColumn>

                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p>
            *** Deletar um user é irreversível!!!
          </p>
      </div>
    )
  }
}

Users.propTypes = {
  users: PropTypes.array,
  actions: PropTypes.object,
};

const mapStateToProps = ({appState, auth}) => ({
  users: auth.users
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
