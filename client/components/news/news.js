import React, {PropTypes} from 'react';
import style from './news.css';
import {Link} from 'react-router';

const Post = ({slug, img, title}) => (
  <li>
    <Link to={'' + slug}>
      <span className={style.hover}>
        <img src={img} />
        <span>VER NOTÍCIA</span>
      </span>
      <h4>{title}</h4>
    </Link>
  </li>
)

Post.propTypes = {
  slug: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string
}

const news = [
  {slug: 'oalr1', img: 'http://lorempixel.com/300/300/nightlife/4', title: 'Nome da noticia' },
  {slug: 'oalr2', img: 'http://lorempixel.com/300/300/nightlife/5', title: 'Nome da noticia' },
  {slug: 'oalr3', img: 'http://lorempixel.com/300/300/nightlife/6', title: 'Nome da noticia' },
];

const News = () => (
  <div className={style.news}>
  	<ul>

      {news.map(item => 
        <Post
          key={item.slug}
          slug={item.slug}
          img={item.img}
          title={item.title}
        />
      )}

  	</ul>

  	<div className={style.separator}>
  		<Link to='/news/'>
  			Ver mais notícias
  		</Link>
  	</div>



  </div>
);

export default News;
