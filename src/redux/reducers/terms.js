const defaultStartState = {
  terms: '',
  faq: '',
  fetching: false,
  error: null
};

export default function origins(state = defaultStartState, action) {
  switch (action.type) {
    case "GET_TERMS_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_TERMS_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        terms: action.payload.response
      });
    case "GET_TERMS_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    case "GET_FAQ_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_FAQ_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        faq: action.payload.response
      });
    case "GET_FAQ_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    default:
      return state;
  }
}
