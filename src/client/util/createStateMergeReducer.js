// Returns a new state object which is the result of merging the current state with the object which the action handler returns;
export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    return (handlers.hasOwnProperty(action.type)) ?
      Object.assign({}, state, handlers[action.type](state, action)) :
      state;
  };
}
