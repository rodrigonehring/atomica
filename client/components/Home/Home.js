import React from 'react';
import Helmet from 'react-helmet';
import News from '../news/news';

import style from './home.css';

const Home = () => (
  <div>
    <Helmet title='Home' />
    <div className={style.title}>
    	<h1>Notícias</h1>
    </div>
    <div className={style.subtitle}>
    	<h2>CONFIRA NOVIDADES DO MUNDO DA MÚSICA</h2>
    </div>
    <div className={style.newsBox}>
    	<News />
    </div>
  </div>
);

export default Home;
