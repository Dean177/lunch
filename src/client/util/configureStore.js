import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { syncHistory } from 'react-router-redux';
import rootReducer from '../reducers/index';
import { logger, serverEvent, actionFormatValidator } from './middleware';

export default function configureStore(history, initialState) {
  const reduxRouterMiddleware = syncHistory(history);

  let middleware;
  if (__DEVELOPMENT__) {
    middleware = applyMiddleware(
      actionFormatValidator,
      logger,
      serverEvent,
      thunk,
      reduxRouterMiddleware
    );
  } else {
    middleware = applyMiddleware(
      serverEvent,
      thunk,
      reduxRouterMiddleware
    );
  }

  const store = createStore(rootReducer, initialState, middleware);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../reducers/index', () => {
      store.replaceReducer(require('../reducers/index').default);
    });
  }

  return store;
}
