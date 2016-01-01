import createStateMergeReducer from '../util/createStateMergeReducer';
import {
  Authenticated,
  SplitwiseAuth,
  SplitwiseAuthFailure,
  SplitwiseAuthSuccess,
} from '../../shared/constants/actionTypes/authActionTypes';
const initialState = {
  hasAuthorizedSplitwiseToken: false,
  isAuthenticated: false,
  isAttemptingSplitwiseAuthentication: false,
  splitwiseAuthFailureMessage: '',
  splitwiseAuthorizationLink: '',
  splitwiseAuthorizationToken: '',
  splitwiseUserDetails: {},
};


const authenticationReducer = createStateMergeReducer(initialState, {
  [Authenticated](state, { payload }) {
    const { token, splitwiseAuthorizationLink, hasAuthorizedSplitwiseToken } = payload;
    return {
      hasAuthorizedSplitwiseToken,
      isAttemptingSplitwiseAuthentication: false,
      isAuthenticated: true,
      splitwiseAuthorizationLink,
      splitwiseAuthorizationToken: token,
    };
  },

  [SplitwiseAuth]() {
    return {
      isAttemptingSplitwiseAuthentication: true,
      splitwiseAuthFailureMessage: '',
    };
  },

  [SplitwiseAuthFailure](state, { payload: { message } }) {
    return {
      hasAuthorizedSplitwiseToken: false,
      isAttemptingSplitwiseAuthentication: false,
      splitwiseAuthFailureMessage: message,
    };
  },

  [SplitwiseAuthSuccess](state, action) {
    return {
      hasAuthorizedSplitwiseToken: true,
      isAttemptingSplitwiseAuthentication: false,
      splitwiseUserDetails: action.payload,
    };
  },

});

export default authenticationReducer;
