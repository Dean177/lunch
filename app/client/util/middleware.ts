import send from './socket';
import {assign} from '../../shared/util/assign';
import Middleware = Redux.Middleware;
import MiddlewareArg = Redux.MiddlewareArg;

export const logger: Middleware = store => next => action => {
  const result = next(action);
  console.log('action', action, 'next state', store.getState());
  return result;
};

export const serverEvent: Middleware = (store: MiddlewareArg) => {
  return next => action => {
    if (action.meta && action.meta.isServerAction) {
      const user = store.getState().user;
      send(assign({}, action, { meta: { user }}));
    }

    return next(action);
  };
};

export const actionFormatValidator: Middleware = (store: MiddlewareArg) => next => action => {
  if (! action.payload || !action.type) {
    console.error('Action received which does not contain a payload, this is probably a mistake', action);
  }
  return next(action);
};
