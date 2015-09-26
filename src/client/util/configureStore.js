import { createStore, compose } from 'redux';
import { devTools } from 'redux-devtools';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import rootReducer from '../reducers/index';


const createStoreFinal = compose(
  reduxReactRouter({ createHistory }),
  devTools()
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreFinal(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
