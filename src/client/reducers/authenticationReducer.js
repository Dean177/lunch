import createStateMergeReducer from '../util/createStateMergeReducer';
import {
  Authenticated,
  SplitwiseAuth,
  SplitwiseAuthFailure,
  SplitwiseAuthSuccess,
  SplitwiseAuthToken,
} from '../../shared/constants/actionTypes/authActionTypes';


const initialState = {
  hasAuthorizedSplitwiseToken: false,
  isAuthenticated: false,
  isAttemptingSplitwiseAuthentication: false,
  splitwiseAuthFailureMessage: '',
  splitwiseAuthorizationLink: '',
  splitwiseUserDetails: {},
};

const authenticationReducer = createStateMergeReducer(initialState, {
  [Authenticated](state, { payload: { } }) {
    return { isAuthenticated: true };
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

  [SplitwiseAuthToken](
    state,
    { payload: { hasAuthorizedSplitwiseToken, splitwiseAuthorizationLink } }
  ) {
    return { hasAuthorizedSplitwiseToken, splitwiseAuthorizationLink };
  },

});

export default authenticationReducer;
