
const initialState = {
  messages: [
    {
      message: 'a mensagemdsadnusa...',
      type: 'user', //admin, info
      user: {
        email: 'email@dasdas.com',
        image: '',
      },
    },
  ],
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
        messages: [].concat(payload, state.messages)
      }
    }

    default:
      return state;
  }
};
