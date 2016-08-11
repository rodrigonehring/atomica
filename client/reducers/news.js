
const initialState = {
  news: [
    {slug: 'oalr1', img: 'http://dummyimage.com/300x300/ccc/fff', title: 'Noticia 1' },
    {slug: 'oalr2', img: 'http://dummyimage.com/300x300/ccc/fff', title: 'Nome da noticia' },
    {slug: 'oalr3', img: 'http://dummyimage.com/300x300/ccc/fff', title: 'Nome da nooticia' },
    {slug: 'oalr4', img: 'http://dummyimage.com/300x300/ccc/fff', title: 'Nome da noticia nova' }
  ]
};

export default (state = initialState, {type}) => {
  switch (type) {
    case 'GET_NEWS':
      return Object.assign({}, state, {
        news: [{slug: 'oalr1', img: 'http://dummyimage.com/300x300/ccc/fff', title: 'Nome da noticia' },]
      });

    default:
      return state;
  }
};
