import axios from "axios";
import { ip } from "../../config/server";

export function getOriginsAttempt() {
  return {
    type: "GET_ORIGINS_ATTEMPT"
  };
}

export function getOriginsSuccess(response) {
  return {
    type: "GET_ORIGINS_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getOriginsFailure(error) {
  return {
    type: "GET_ORIGINS_FAILURE",
    payload: {
      error
    }
  };
}

export function getOriginsRequest() {
  return dispatch => {
    dispatch(getOriginsAttempt());
    return axios
      .get(`${ip}/origin`)
      .then(response => dispatch(getOriginsSuccess(response)))
      .catch(error => {
        console.log('get origins request', error)
        return dispatch(getOriginsFailure(error))
      });
  };
}
