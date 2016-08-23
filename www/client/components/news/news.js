import React, {PropTypes} from 'react';
import style from './news.css';
import {Link} from 'react-router';

const Post = ({slug, img, title}) => (
  <li>
    <Link to={'/posts/read/' + slug}>
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

const News = ({news}) => (
  <div className={style.news}>
  	<ul>

      {news.map(item =>
        <Post
          key={item.slug}
          slug={item.slug}
          img={item.image ? `/uploads/${item.image}` : 'http://dummyimage.com/300x300/ccc/fff'}
          title={item.title}
        />
      )}

  	</ul>




  </div>
);

News.propTypes = {
  news: PropTypes.array
};

export default News;
