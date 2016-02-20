import { keys, difference } from 'underscore';
// Returns a reducer which produces a new state object which is the result of merging the current
// state with the object which the action handler returns.
// Persists this object to the browsers local storage each time the reducer is called;
// (reducerConfig) => (localStorage) => reducer
export default function createLocalStorageMergeReducer(storageKey, initialState, actionHandler) {
  return function createReducer(localStorage) {
    const savedString = localStorage.getItem(storageKey);

    let reducerInitialState;
    if (savedString !== null && savedString !== undefined) {
      const parsedState = JSON.parse(savedString);
      const isObject = typeof parsedState === 'object';
      const hasExpectedKeys = difference(keys(parsedState), keys(initialState)).length === 0;
      const hasSameShape = isObject && hasExpectedKeys;
      reducerInitialState = hasSameShape ? parsedState : initialState;
    } else {
      reducerInitialState = initialState;
    }
    localStorage.setItem(storageKey, JSON.stringify(reducerInitialState));

    return function reducer(state = reducerInitialState, action) {
      let newState = state;
      if (actionHandler.hasOwnProperty(action.type)) {
        newState = Object.assign({}, state, actionHandler[action.type](state, action));
        localStorage.setItem(storageKey, JSON.stringify(newState));
      }
      return newState;
    };
  };
}
