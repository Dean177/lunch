import createLocalStorageMergeReducer from '../util/createLocalStorageMergeReducer';

const initialState = {
  hasAuthorizedToken: false,
};

const UserHasAuthorizedToken = 'UserHasAuthorizedToken';

const CreateSplitwiseReducer = createLocalStorageMergeReducer('splitwise', initialState, {
  [UserHasAuthorizedToken](state, { payload: { name } }) {
    return { hasAuthorizedToken: true };
  },
});

export default CreateSplitwiseReducer;
