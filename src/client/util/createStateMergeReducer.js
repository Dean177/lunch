// Returns a new state object which is the result of merging the current state with the object which the action handler returns;
export default function createMergeReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    return (handlers.hasOwnProperty(action.type)) ?
      Object.assign({}, state, handlers[action.type](state, action)) :
      state;
  };
}

// Returns a new state object which is the result of merging the current state with the
// object which the action handler returns.
// Persists this object to the browsers local storage;
// (reducerConfig) => (localStorage) => reducer
export function createLocalStorageMergeReducer(storageKey, initialState, handlers) {
  return function createReducer(localStorage) {
    const savedState = localStorage.getItem(storageKey);
    const reducerInitialState =  (typeof savedState === 'object') && savedState != null && savedState != undefined ? JSON.parse(savedState) : initialState;

    return function reducer(state = reducerInitialState, action) {
      if (handlers.hasOwnProperty(action.type)) {
        const newState = Object.assign({}, state, handlers[action.type](state, action));
        localStorage.setItem(storageKey, JSON.stringify(newState));
        return newState;
      } else {
        return state;
      }
    };
  }
}
