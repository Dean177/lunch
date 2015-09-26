import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import lunchReducer from './lunchReducer';

const rootReducer = combineReducers({
  router: routerStateReducer,
  lunch: lunchReducer,
});

export default rootReducer;
