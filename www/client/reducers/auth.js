
const initialState = {
  user: {},
  users: [],
  loginOpen: false,
  createOpen: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'INSERT_USER':
      payload.user.img = payload.img
      return {
        ...state,
        user: payload.user
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
        createOpen: false,
      }

    case 'OPEN_LOGIN':
      return {
        ...state,
        loginOpen: true,
        createOpen: false,
      }

    case 'OPEN_CREATE':
      return {
        ...state,
        loginOpen: false,
        createOpen: true,
      }

    case 'USERS':
      return {
        ...state,
        users: payload
      }
    case 'DELETE_USER_ID':
      return {
        ...state,
        users: state.users.filter(item => item._id !== payload)
      }

    case 'UPDATE_USER_ID':
      return {
        ...state,
        users: state.users.map(item => {
          if (item._id !== payload._id)
            return item
          return payload
        })
      }



    default:
      return state;
  }
};
