const defaultStartState = {
  origins: [],
  fetching: false,
  error: null
};

export default function origins(state = defaultStartState, action) {
  switch (action.type) {
    case "GET_ORIGINS_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_ORIGINS_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        origins: action.payload.response
      });
    case "GET_ORIGINS_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    default:
      return state;
  }
}
