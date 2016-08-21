import {
  START_LOADING,
  STOP_LOADING
} from '../actions/types';

const initialState = {
  loading: false,
  snackbar: {
    open: false,
    message: ''
  }
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case START_LOADING:
      return Object.assign({}, state, {
        loading: true
      });

    case STOP_LOADING:
      return Object.assign({}, state, {
        loading: false
      });

    case 'SNACK':
      return {
        ...state,
        snackbar: {
          open: true,
          message: payload
        }
      }

    case 'SNACK_CLOSE':
      return {
        ...state,
        snackbar: {
          open: false,
          message: ''
        }
      }

    default:
      return state;
  }
};
