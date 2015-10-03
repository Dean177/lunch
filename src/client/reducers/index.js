import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import lunchReducer from './lunchReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  router: routerStateReducer,
  lunch: lunchReducer,
  user: userReducer,
});

export default rootReducer;
