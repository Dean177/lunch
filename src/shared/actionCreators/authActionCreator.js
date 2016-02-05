import {
  Authenticated,
  SplitwiseAuth,
  SplitwiseAuthFailure,
  SplitwiseAuthSuccess,
  SplitwiseAuthToken,
} from '../constants/actionTypes/authActionTypes';

export function userAuthenticated(isAuthorized) {
  return { type: Authenticated, payload: { isAuthorized } };
}

export function splitwiseAuthAttempt() {
  return {
    type: SplitwiseAuth,
    payload: {},
    meta: { isServerAction: true },
  };
}

export function splitwiseAuthFailure(message) {
  return { type: SplitwiseAuthFailure, payload: { message } };
}

export function splitwiseAuthSuccess(splitwiseUser) {
  return { type: SplitwiseAuthSuccess, payload: splitwiseUser };
}

export function splitwiseAuthToken(hasAuthedToken, authLink, userId) {
  return {
    type: SplitwiseAuthToken,
    payload: {
      hasAuthorizedSplitwiseToken: hasAuthedToken,
      userId,
      splitwiseAuthorizationLink: authLink ? authLink : '',
    },
  };
}
