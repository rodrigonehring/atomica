import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';

import {connect} from 'react-redux';
import * as actionCreators from '../../actions'
import { bindActionCreators } from 'redux'
import Divider from 'material-ui/Divider';
import ReactMarkdown from 'react-markdown';
import styles from './news.css'

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
    let image = () => (<img src={`/uploads/${current.image}`} />)

    return (
    <div className={styles.single}>
      <Helmet title={current.title} />
      <div>
        <h1>{current.title}</h1>
      </div>
      <Divider />
        {current.image ? image() : ''}

        <ReactMarkdown source={current.content} />



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
