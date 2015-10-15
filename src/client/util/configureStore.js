import { createStore, compose, applyMiddleware } from 'redux';
import { devTools } from 'redux-devtools';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import rootReducer from '../reducers/index';
import { logger, serverEvent, actionFormatValidator } from './middleware';

export default function configureStore(routes, initialState) {
  const createStoreFinal = compose(
    applyMiddleware(
      logger,
      serverEvent,
      actionFormatValidator),
    reduxReactRouter({
      routes,
      createHistory,
    })
    //,devTools()
  )(createStore);

  const store = createStoreFinal(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
