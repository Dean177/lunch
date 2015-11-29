import * as _ from 'underscore';
import {assign} from '../../shared/util/assign';
import Reducer = Redux.Reducer;

// Returns a new state object which is the result of merging the current state with the
// object which the action handler returns.
// Persists this object to the browsers local storage;
// (reducerConfig) => (localStorage) => reducer
export default function createLocalStorageMergeReducer<T>(storageKey: string, initialState: T, actionHandler: any) {
  return function createReducer(localStorage): TypedReducer<T> {
    const savedString = localStorage.getItem(storageKey);

    let reducerInitialState: T;
    if (savedString !== null && savedString !== undefined) {
      const parsedState = JSON.parse(savedString);
      const hasSameShape = (typeof parsedState === 'object') && _.difference(_.keys(parsedState), _.keys(initialState)).length === 0;
      reducerInitialState = hasSameShape ? parsedState : initialState;
    } else {
      reducerInitialState = initialState;
    }
    localStorage.setItem(storageKey, JSON.stringify(reducerInitialState));

    return (state: T = reducerInitialState, action: Action): T => {
      if (actionHandler.hasOwnProperty(action.type)) {
        const newState: T = assign({}, state, actionHandler[action.type](state, action));
        localStorage.setItem(storageKey, JSON.stringify(newState));
        return newState;
      } else {
        return state;
      }
    };
  };
}
