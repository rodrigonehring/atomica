import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';

import {connect} from 'react-redux';
import * as actionCreators from '../../actions'
import { bindActionCreators } from 'redux'
import Divider from 'material-ui/Divider';
import ReactMarkdown from 'react-markdown';


// import style from './home.css';

class Single extends React.Component {

  componentWillMount() {
    if (this.props.params.postSlug !== this.props.current.slug) {
      this.props.actions.clearCurrentPost()
    }
    this.props.actions.getPost(this.props.params.postSlug)
  }

  render() {
    const {current} = this.props

    return (
    <div>
      <Helmet title='Post - name x?' />
      <div>
        <h1>{current.title}</h1>
      </div>
      <Divider />
      <p>
        <ReactMarkdown source={current.content} />
        
      </p>
    </div>)
  }
}

Single.propTypes = {
  current: PropTypes.object
};

const mapStateToProps = ({appState, news}) => ({
  current: news.current
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Single)
