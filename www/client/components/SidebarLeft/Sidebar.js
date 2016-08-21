import React from 'react';
import style from './sidebar.css';
import {Link} from 'react-router';

const Sidebar = ({user, actions}) => (
  <div className={style.sidebar}>

    <div className={style.logo}>
      <img src="/public/img/logo.png" />
    </div>

    <div className={style.menu}>
      <ul>
        <li>
          <Link to='/' activeClassName="active">Home</Link>
        </li>
        <li>
          <Link to='/sobre' activeClassName="active">Sobre</Link>
        </li>
        <li>
          <Link to='/chat' activeClassName="active">Chat</Link>
        </li>
        
        {!user.email ?
          <li>
            <a onClick={actions.openLogin}>Entrar</a>
          </li>
        : ''}

        {!user.email ?
          <li>
            <a onClick={actions.openCreate}>Criar Conta</a>
          </li>
        : ''}
        
        
        <li>
          <Link to='/contato' activeClassName="active">Contato</Link>
        </li>
      </ul>
    </div>

    

  </div>
);

/*<div className={style.ad}>
  <ul>
    <li>
      <img src="http://dummyimage.com/300x150/ccc/fff" />
    </li>
    <li>
      <img src="http://dummyimage.com/300x150/ccc/fff" />
    </li>
  </ul>
</div> */

export default Sidebar;