import axios from "axios";
import { ip } from "../../config/server";

export function getTermsAttempt() {
  return {
    type: "GET_TERMS_ATTEMPT"
  };
}

export function getTermsSuccess(response) {
  return {
    type: "GET_TERMS_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getTermsFailure(error) {
  return {
    type: "GET_TERMS_FAILURE",
    payload: {
      error
    }
  };
}

export function getTermsRequest() {
  return dispatch => {
    dispatch(getTermsAttempt());
    return axios
      .get(`${ip}/terminos/termsAndPrivacy`)
      .then(response => dispatch(getTermsSuccess(response)))
      .catch(error => {
        console.log('get termsAndPrivacy request', error)
        return dispatch(getTermsFailure(error))
      });
  };
}

export function getFaqAttempt() {
  return {
    type: "GET_FAQ_ATTEMPT"
  };
}

export function getFaqSuccess(response) {
  return {
    type: "GET_FAQ_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getFaqFailure(error) {
  return {
    type: "GET_FAQ_FAILURE",
    payload: {
      error
    }
  };
}

export function getFaqRequest() {
  return dispatch => {
    dispatch(getFaqAttempt());
    return axios
      .get(`${ip}/terminos/faq`)
      .then(response => dispatch(getFaqSuccess(response)))
      .catch(error => {
        console.log('get faq request', error)
        return dispatch(getFaqFailure(error))
      });
  };
}
