/// <reference path="../../custom-typings/redux-router.d.ts" />
import { createStore, compose, applyMiddleware } from 'redux';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import rootReducer from '../reducers/index';
import { logger, serverEvent, actionFormatValidator } from './middleware';

declare const module: {
  hot?: { accept: (path: string, callback: () => void) => void };
};

export function configureStore(routes, initialState?) {
  let createStoreFinal;

  if (__DEVELOPMENT__) {
    const { devTools } = require('redux-devtools');
    createStoreFinal = compose(
      applyMiddleware(logger, serverEvent, actionFormatValidator),
      reduxReactRouter({ routes, createHistory }),
      devTools()
    )(createStore);
  } else {
    createStoreFinal = compose(
      applyMiddleware(serverEvent, actionFormatValidator),
      reduxReactRouter({ routes, createHistory })
    )(createStore);
  }

  const store = createStoreFinal(rootReducer, initialState);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../reducers/index', () => {
      store.replaceReducer(require('../reducers/index'));
    });
  }

  return store;
}
