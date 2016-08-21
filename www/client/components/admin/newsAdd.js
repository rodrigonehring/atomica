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
import TextField from 'material-ui/TextField';
import ReactMarkdown from 'react-markdown';


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import style from './style.css';

const buttonStyle = {
  marginBottom: 20,
  display: 'block'
};

class News extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: 'Titulo da noticia',
      content: '# This is a header\n\nAnd this is a paragraph'
    }
  }

  onChange = ({target}) => {
      this.setState({
        ...this.state,
        [target.id]: target.value
      })
      console.log(this.state)
  }

  handleSubmit = () => {
    this.props.actions.addPost(this.state)
  }

  render() {
    return (
      <div>
        <Helmet title='Add News' />

        <Link to="/admin/news" style={buttonStyle}>
          <RaisedButton label="Voltar" icon={<ContentAdd />}  />
        </Link>

        <TextField
             floatingLabelText="Titulo"
             fullWidth={true}
             id="title"
             value={this.state.title}
             onChange={this.onChange}
         /><br />

         <TextField
            rows={5}
            multiLine={true}
            id="content"
            onChange={this.onChange}
            value={this.state.content}
            fullWidth={true}
            floatingLabelText="News" 
         /><br />

         <h1>
          Preview:
         </h1>

         <ReactMarkdown source={this.state.content} />





         <RaisedButton label="Enviar" primary={true} onClick={this.handleSubmit}  />
 
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
