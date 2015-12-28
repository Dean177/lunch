import createStateMergeReducer from '../util/createStateMergeReducer';
import {
  Authenticated,
  SplitwiseAuth,
  SplitwiseAuthFailure,
  SplitwiseAuthSuccess,
  SplitwiseAuthToken,
} from '../../shared/constants/actionTypes/authActionTypes';
const initialState = {
  splitwiseAuthorizationLink: '',
  isAuthenticated: false,
  isAttemptingSplitwiseAuthentication: false,
  splitwiseAuthFailureMessage: '',
  hasAuthorizedSplitwiseToken: false,
  splitwiseAuthorizationToken: '',
};


const CreateSplitwiseReducer = createStateMergeReducer(initialState, {
  [Authenticated]() {
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
      isAttemptingSplitwiseAuthentication: false,
      splitwiseAuthFailureMessage: message,
    };
  },

  [SplitwiseAuthSuccess]() {
    return {
      isAttemptingSplitwiseAuthentication: false,
    };
  },

  [SplitwiseAuthToken](state, { payload: { authToken } }) {
    return { splitwiseAuthorizationToken: authToken };
  },
});

export default CreateSplitwiseReducer;
