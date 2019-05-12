import axios from "axios";
import { ip } from "../../config/server";


export function getTripsWithOriginAttempt() {
  return {
    type: "GET_TRIPS_WITH_ORIGIN_ATTEMPT"
  };
}

export function getTripsWithOriginSuccess(response) {
  return {
    type: "GET_TRIPS_WITH_ORIGIN_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getTripsWithOriginFailure(error) {
  return {
    type: "GET_TRIPS_WITH_ORIGIN_FAILURE",
    payload: {
      error
    }
  };
}

export function getTripsWithOriginRequest(originId) {
  return dispatch => {
    dispatch(getTripsWithOriginAttempt());
    return axios
      .get(`${ip}/trip/gettripswithorigin/${originId}`)
      .then(response => dispatch(getTripsWithOriginSuccess(response)))
      .catch(error => {
        console.log('eror en el trips request', error)
        return dispatch(getTripsWithOriginFailure(error))
      });
  };
}


export function getTripAttempt() {
  return {
    type: "GET_TRIP_ATTEMPT"
  };
}

export function getTripSuccess(response) {
  return {
    type: "GET_TRIP_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getTripFailure(error) {
  return {
    type: "GET_TRIP_FAILURE",
    payload: {
      error
    }
  };
}

export function getTripRequest(id) {
  return dispatch => {
    dispatch(getTripAttempt());
    return axios
      .get(`${ip}/trip/${id}`)
      .then(response => dispatch(getTripSuccess(response)))
      .catch(error => {
        console.log('eror en el trips request', error)
        return dispatch(getTripFailure(error))
      });
  };
}

export function grabDataFromAsyncStorage(data) {
  return {
    type: "GRAB_DATA_FROM_ASYNC_STORAGE",
    payload: {
      response: data
    }
  };
}