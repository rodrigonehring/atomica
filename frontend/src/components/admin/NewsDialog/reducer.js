
const initialState = {
  open: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'NEWS_DIALOG_OPEN':
      return {
        ...state,
        open: true,
      }

    case 'NEWS_DIALOG_CLOSE':
      return {
        ...state,
        open: false,
      }

    default:
      return state;
  }
};
