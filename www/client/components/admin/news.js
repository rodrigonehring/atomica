import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions'
import { bindActionCreators } from 'redux'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/clear';
import IconEdit from 'material-ui/svg-icons/content/create';
import { Link } from 'react-router'


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import style from './style.css';

const tableStyle = {
  marginBottom: 20,
};

class News extends React.Component {

  componentWillMount() {
    this.props.actions.getPostList()
  }

  render() {
    return (
      <div>
        <Helmet title='News' />

        <Link to="/admin/news/add">
          <RaisedButton label="Adicionar News" icon={<ContentAdd />}  style={tableStyle}/>
        </Link>
 

        <Table  >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn className={style.rowId}>Slug</TableHeaderColumn>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn className={style.rowId}>Editar</TableHeaderColumn>
                <TableHeaderColumn className={style.rowId}>Deletar</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.news.map((item, index) => (
                <TableRow key={index}>
                  <TableRowColumn className={style.rowId}>{item.slug}</TableRowColumn>
                  <TableRowColumn>{item.title}</TableRowColumn>

                  <TableRowColumn className={style.rowId}>
                    <IconButton>
                         <IconEdit />
                    </IconButton>
                  </TableRowColumn>

                  <TableRowColumn className={style.rowId}>
                    <IconButton onClick={() => this.props.actions.deletePost(item._id)}>
                         <ContentRemove />
                    </IconButton>
                  </TableRowColumn>

                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p>
            *** Deletar uma news é irreversível!!!
          </p>
      </div>
    )
  }
}

News.propTypes = {
  users: PropTypes.array,
  actions: PropTypes.object,
};

const mapStateToProps = ({news}) => ({
  news: news.news
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)
