import React from 'react';
import style from './news.css';
import {Link} from 'react-router';

const News = () => (
  <div className={style.news}>
  	<ul>

  		<li>
  			<Link to='/news/noticia1'>
  				<span className={style.hover}>
  					<img src="http://lorempixel.com/300/300/nightlife/1" />
  					<span>VER NOTÍCIA</span>
  				</span>
	  			
	  			<h4>Nome da noticia</h4>
  			</Link>
  		</li>

  		<li>
  			<Link to='/news/noticia1'>
  				<span className={style.hover}>
  					<img src="http://lorempixel.com/300/300/nightlife/4" />
  					<span>VER NOTÍCIA</span>
  				</span>
	  			<h4>Nome da noticia com duas linhas de texto</h4>
  			</Link>
  		</li>

  		<li>
  			<Link to='/news/noticia1'>
  				<span className={style.hover}>
  					<img src="http://lorempixel.com/300/300/nightlife/6" />
  					<span>VER NOTÍCIA</span>
  				</span>
	  			
	  			<h4>Nome da noticia</h4>
  			</Link>
  		</li>

  	</ul>

  	<div className={style.separator}>
  		<Link to='/news/'>
  			Ver mais notícias
  		</Link>
  	</div>



  </div>
);

export default News;
