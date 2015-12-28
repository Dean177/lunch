import { SplitwiseAuth, SplitwiseAuthFailure, SplitwiseAuthSuccess } from '../constants/actionTypes/authActionTypes';

export function splitwiseAuthAttempt() {
  return {
    type: SplitwiseAuth,
    payload: {},
    meta: { isServerAction: true },
  };
}

export function splitwiseAuthFailure(message) {
  return {
    type: SplitwiseAuthFailure,
    payload: { message },
  };
}

export function splitwiseAuthSuccess(authToken) {
  return {
    type: SplitwiseAuthSuccess,
    payload: { authToken },
  };
}
