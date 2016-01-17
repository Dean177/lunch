import { createStore, applyMiddleware } from 'redux';
import { syncHistory } from 'redux-simple-router';
import rootReducer from '../reducers/index';
import { logger, serverEvent, actionFormatValidator } from './middleware';

export default function configureStore(routes, history, initialState) {
  const reduxRouterMiddleware = syncHistory(history);

  let createStoreWithMiddleware;
  if (__DEVELOPMENT__) {
    createStoreWithMiddleware = applyMiddleware(
      actionFormatValidator,
      logger,
      serverEvent,
      reduxRouterMiddleware
    )(createStore);
  } else {
    createStoreWithMiddleware = applyMiddleware(serverEvent, reduxRouterMiddleware)(createStore);
  }

  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../reducers/index', () => {
      store.replaceReducer(require('../reducers/index').default);
    });
  }

  return store;
}
