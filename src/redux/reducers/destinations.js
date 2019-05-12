const defaultStartState = {
  destinations: [],
  fetching: false,
  error: null
};

export default function destinations(state = defaultStartState, action) {
  switch (action.type) {
    case "GET_DESTINATIONS_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_DESTINATIONS_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        destinations: action.payload.response
      });
    case "GET_DESTINATIONS_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    default:
      return state;
  }
}
