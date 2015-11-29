/* eslint no-unused-expressions: 0 */
import createStateMergeReducer from '../../../client/util/createStateMergeReducer';
import * as chai from 'chai';

interface TestState {
  aKey: string;
  key?: any;
}

describe('createStateMergeReducer', () => {
  const SomeActionType = 'SomeAction';
  const initialState: TestState = { aKey: 'aValue' };
  const reducerObject = {
    [SomeActionType](state, { payload }) {
      return { [payload.key]: payload.value };
    },
  };

  const reducer = createStateMergeReducer(initialState, reducerObject);

  it('Will merge state returned by the reducerObject into its current state to produce a new state object', () => {
    const action = { type: SomeActionType, payload: { key: 'key', value: 'value'}, meta: {} };
    const newState = reducer(initialState, action);

    chai.assert.isDefined(newState.key, 'the new state key has been defined');
    chai.expect(newState.key).to.equal(action.payload.value);
  });

  it('Will override keys on the input state when merging the state object', () => {
    const action = { type: SomeActionType, payload: { key: 'aKey', value: 'value'}, meta: {} };
    const newState = reducer(initialState, action);

    chai.expect(newState.aKey).not.to.equal(initialState.aKey);
    chai.expect(newState.aKey).to.equal(action.payload.value);
  });
});
