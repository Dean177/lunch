const chai = require('chai');
chai.use(require('dirty-chai'));
const expect = chai.expect;
import createStateMergeReducer from '../../../client/util/createStateMergeReducer';


describe('createStateMergeReducer', () => {
  const SomeActionType = 'SomeAction';
  const initialState = { aKey: 'aValue' };
  const reducerObject = {
    [SomeActionType](state, { payload }) {
      return { [payload.key]: payload.value };
    },
  };

  const reducer = createStateMergeReducer(initialState, reducerObject);

  it(
    'Merges state returned by the reducerObject into its current state to produce the new state',
    () => {
      const action = { type: SomeActionType, payload: { key: 'key', value: 'value' } };
      const newState = reducer(initialState, action);

      expect(newState.key).to.not.be.undefined();
      expect(newState.key).to.equal(action.payload.value);
    }
  );

  it('Will override keys on the input state when merging the state object', () => {
    const action = { type: SomeActionType, payload: { key: 'aKey', value: 'value' } };
    const newState = reducer(initialState, action);

    expect(newState.aKey).not.to.equal(initialState.aKey);
    expect(newState.aKey).to.equal(action.payload.value);
  });
});
