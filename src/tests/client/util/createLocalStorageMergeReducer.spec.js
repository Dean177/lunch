import { expect } from 'chai';
import createLocalStorageMergeReducer from '../../../client/util/createLocalStorageMergeReducer';
import mockLocalStorage from '../../testingUtil/mockLocalStorage';


describe('createLocalStorageMergeReducer', () => {
  const SomeActionType = 'SomeAction';
  const stateKey = 'stateKey';
  const initialState = { aKey: 'initialA', bKey: 'initialB' };
  const reducerObject = {
    [SomeActionType](state, { payload }) {
      return { [payload.key]: payload.value };
    },
  };

  const createReducer = createLocalStorageMergeReducer(stateKey, initialState, reducerObject);

  it('Will store its state in localStorage using the provided state key after each action', () => {
    const localStorage = mockLocalStorage();
    createReducer(localStorage);

    expect(localStorage.getItem(stateKey)).to.equal(JSON.stringify(initialState));
  });

  it('Will attempt to get its initial state from localStorage, falling back to the provided initial state', () => {
    const localStorage = mockLocalStorage();
    const localStorageState = { aKey: 'savedA', bKey: 'savedB' };
    localStorage.setItem(stateKey, JSON.stringify(localStorageState));

    const reducer = createReducer(localStorage);
    const savedState = reducer(undefined, { type: '', payload: {} });

    expect(savedState).to.deep.equal(localStorageState);
  });

  it('Will merge state returned by the reducerObject into its current state to produce a new state object', () => {
    const action = { type: SomeActionType, payload: { key: 'bKey', value: 'newBValue'} };
    const reducer = createReducer(mockLocalStorage());
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({ aKey: initialState.aKey, bKey: action.payload.value });
  });

  it(`Will fall back to using initial state where the retrieved localStorage doesn't match the shape of the initial state`, () => {
    const localStorage = mockLocalStorage();
    const localStorageState = { cKey: 'savedC' };
    localStorage.setItem(stateKey, JSON.stringify(localStorageState));

    const reducer = createReducer(localStorage);
    const savedState = reducer(undefined, { type: '', payload: {} });

    expect(savedState).to.deep.equal(initialState);
  });
});
