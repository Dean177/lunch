import {assign} from '../../shared/util/assign';

// Returns a new state object which is the result of merging the current state with the object which the action handler returns;
export default function createMergeReducer<T>(initialState: T, actionHandler: any) {
  return function reducer(state: T = initialState, action: Action): T {
    return (actionHandler.hasOwnProperty(action.type)) ?
      assign({}, state, actionHandler[action.type](state, action)) :
      state;
  };
}
