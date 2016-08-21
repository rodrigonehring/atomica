
const initialState = {
  news: [],
  current: {}
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'POSTS_FETCH':
      return {
        ...state,
        news: payload
      }

    case 'DELETE_POST_LIST':
      return {
        ...state,
        news: state.news.filter(item => item._id !== payload)
      }

    case 'CURRENT_POST':
      return {
        ...state,
        current: payload
      }

    case 'CLEAR_CURRENT_POST':
      return {
        ...state,
        current: {}
      }

    default:
      return state;
  }
};
