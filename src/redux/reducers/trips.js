const defaultStartState = {
  possibleDestinations: [],
  fetching: false,
  error: null,
  selectedTrip: null,
  skyspotsArrayForMap: []
};

export default function trips(state = defaultStartState, action) {
  switch (action.type) {
    case "GET_TRIPS_WITH_ORIGIN_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_TRIPS_WITH_ORIGIN_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        possibleDestinations: action.payload.response
      });
    case "GET_TRIPS_WITH_ORIGIN_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    case "GET_TRIP_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_TRIP_SUCCESS":
      let skyspots = action.payload.response.data.skyspots
      let skyspotsArrayForMap = skyspots.map(skyspot => {
        let newArr = []
        newArr.push(skyspot.longitude)
        newArr.push(skyspot.latitude)
        let newObj = {}
        newObj.id = skyspot.id
        newObj.data = skyspot.data
        newObj.coords = newArr
        return newObj
      })
      return Object.assign({}, state, {
        fetching: false,
        selectedTrip: action.payload.response,
        skyspotsArrayForMap
        // las coordenadas de este skyspotsArrayForMap estan al reves de lo normal. el primero es longitud, y el segundo latitud.
      });
    case "GET_TRIP_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    case "GRAB_DATA_FROM_ASYNC_STORAGE":
      console.log('action.payload.response de grab data from async storage is', action.payload.response)
      let skyspotsFromAsync = action.payload.response.skyspots
      let skyspotsArrayForMapFromAsync = skyspotsFromAsync.map(skyspot => {
        let newArr = []
        newArr.push(skyspot.longitude)
        newArr.push(skyspot.latitude)
        let newObj = {}
        newObj.id = skyspot.id
        newObj.data = skyspot.data
        newObj.coords = newArr
        return newObj
      })
      console.log('skyspotsArrayForMapFromAsync', skyspotsArrayForMapFromAsync)
      return Object.assign({}, state, {
        fetching: false,
        // selectedTrip: action.payload.response,
        skyspotsArrayForMap: skyspotsArrayForMapFromAsync 
      });      
    default:
      return state;
  }
}
