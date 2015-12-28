import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import lunchReducer from './lunchReducer';
import createUserReducer from './createUserReducer';
import authenticationReducer from './authenticationReducer';

const rootReducer = combineReducers({
  auth: authenticationReducer,
  lunch: lunchReducer,
  router: routerStateReducer,
  user: createUserReducer(window.localStorage),
});

export default rootReducer;
