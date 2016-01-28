import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import lunchReducer from './lunchReducer';
import createUserReducer from './createUserReducer';
import authenticationReducer from './authenticationReducer';

export default combineReducers({
  auth: authenticationReducer,
  lunch: lunchReducer,
  routing: routeReducer,
  user: createUserReducer(window.localStorage),
});
