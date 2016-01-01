import { createStore, compose, applyMiddleware } from 'redux';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import rootReducer from '../reducers/index';
import { logger, serverEvent, actionFormatValidator } from './middleware';

export default function configureStore(routes, initialState) {
  let createStoreFinal;

  if (__DEVELOPMENT__) {
    createStoreFinal = compose(
      applyMiddleware(logger, serverEvent, actionFormatValidator),
      reduxReactRouter({ routes, createHistory })
    )(createStore);
  } else {
    createStoreFinal = compose(
      applyMiddleware(serverEvent),
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
