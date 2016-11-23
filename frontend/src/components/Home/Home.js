import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import News from '../news/news';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions'
import { bindActionCreators } from 'redux'

import style from './home.css';

class Home extends React.Component {

  componentWillMount() {
    this.props.actions.getPostList()
  }

  render() {
    const {news} = this.props

    return (<div>
      <Helmet title='Home' />
      <div className={style.title}>
        <h1>Notícias</h1>
      </div>
      <div className={style.subtitle}>
        <h2>CONFIRA NOVIDADES DO MUNDO DA MÚSICA</h2>
      </div>
      <div className={style.newsBox}>
        <News news={news} />
      </div>
    </div>)
  }
}

Home.propTypes = {
  news: PropTypes.array
};

const mapStateToProps = ({appState, news}) => ({
  news: news.news
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
