
const initialState = {
  user: {},
  loginOpen: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'INSERT_USER':
      return {
        ...state,
        user: payload
      }

    case 'REMOVE_USER':
      return {
        ...state,
        user: {}
      }

    case 'CLOSE_LOGIN':
      return {
        ...state,
        loginOpen: false,
      }

    case 'OPEN_LOGIN':
      return {
        ...state,
        loginOpen: true,
      }


    default:
      return state;
  }
};
