
const initialState = {
  messages: [],
};

export default (state = initialState, {type, payload}) => {
  console.log(type, payload);
  switch (type) {

    case 'GET_MESSAGES_SUCCESS': {
      return {
        ...state,
        messages: payload,
      }
    }

    case 'NEW_MESSAGE': {
      return {
        ...state,
        messages: [].concat(state.messages, payload)
      }
    }

    case 'REMOVED_ALL_MESSAGES':
      return {
        ...state,
        messages: [],
      }

    default:
      return state;
  }
};
