/* eslint no-unused-expressions: 0 */
import createStateMergeReducer from '../../../client/util/createStateMergeReducer';
import { expect } from 'chai';


describe('createStateMergeReducer', () => {
  const SomeActionType = 'SomeAction';
  const initialState = { aKey: 'aValue' };
  const reducerObject = {
    [SomeActionType](state, { payload }) {
      return { [payload.key]: payload.value };
    },
  };

  const reducer = createStateMergeReducer(initialState, reducerObject);

  it('Will merge state returned by the reducerObject into its current state to produce a new state object', () => {
    const action = { type: SomeActionType, payload: { key: 'key', value: 'value' } };
    const newState = reducer(initialState, action);

    expect(newState.key).to.not.be.undefined;
    expect(newState.key).to.equal(action.payload.value);
  });

  it('Will override keys on the input state when merging the state object', () => {
    const action = { type: SomeActionType, payload: { key: 'aKey', value: 'value' } };
    const newState = reducer(initialState, action);

    expect(newState.aKey).not.to.equal(initialState.aKey);
    expect(newState.aKey).to.equal(action.payload.value);
  });
});
