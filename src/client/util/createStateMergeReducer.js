// Returns a new state object which is the result of merging the current state with the object
// which the action handler returns;
export default function createMergeReducer(initialState, actionHandler) {
  return function reducer(state = initialState, action) {
    return (actionHandler.hasOwnProperty(action.type)) ?
      Object.assign({}, state, actionHandler[action.type](state, action)) :
      state;
  };
}
