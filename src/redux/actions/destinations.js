import axios from "axios";
import { ip } from "../../config/server";

export function getDestinationsAttempt() {
  return {
    type: "GET_DESTINATIONS_ATTEMPT"
  };
}

export function getDestinationsSuccess(response) {
  return {
    type: "GET_DESTINATIONS_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getDestinationsFailure(error) {
  return {
    type: "GET_DESTINATIONS_FAILURE",
    payload: {
      error
    }
  };
}

export function getDestinationsRequest() {
  return dispatch => {
    dispatch(getDestinationsAttempt());
    return axios
      .get(`${ip}/destination`)
      .then(response => dispatch(getDestinationsSuccess(response)))
      .catch(error => {
        console.log('get destinations request', error)
        return dispatch(getDestinationsFailure(error))
      });
  };
}
