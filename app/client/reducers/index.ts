/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../custom-typings/redux-router.d.ts" />
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import lunchReducer from './lunchReducer';
import createUserReducer from './createUserReducer';

const rootReducer = combineReducers({
  router: routerStateReducer,
  lunch: lunchReducer,
  user: createUserReducer(window.localStorage)
});

export default rootReducer;
