import createStateMergeReducer from '../util/createStateMergeReducer';
import { Authenticated } from '../../shared/constants/actionTypes';
const initialState = {
  isAuthenticated: false,
  hasAuthorizedSplitwiseToken: false,
  splitwiseAuthorizationToken: '',
};

const SplitwiseAuthorizationToken = 'SplitwiseAuthorizationToken';

const CreateSplitwiseReducer = createStateMergeReducer(initialState, {
  [Authenticated]() {
    return { isAuthenticated: true };
  },

  [SplitwiseAuthorizationToken](state, { payload: { authToken } }) {
    return { splitwiseAuthorizationToken: authToken };
  },

});

export default CreateSplitwiseReducer;
