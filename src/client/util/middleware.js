import { extend } from 'underscore';
import send from './socket';

export const logger = store => next => action => {
  let result = next(action);
  console.log('action', action, 'next state', store.getState());
  return result;
};

export const serverEvent = store => next => action => {
  if (action.meta && action.meta.isServerAction) {
    const user = store.getState().user;
    send(Object.assign({}, action, { meta: { user }}));
  }

  return next(action);
};

export const actionFormatValidator = store => next => action => {
  if (! action.payload || !action.type) {
    console.error('Action received which does not contain a payload, this is probably a mistake', action);
  }
  return next(action);
};
