/* eslint no-console:0, no-unused-vars: 0 */
import send from './socket';

export const logger = store => next => action => {
  const result = next(action);
  console.log('action', action, 'next state', store.getState());
  return result;
};

export const serverEvent = store => next => action => {
  let updatedAction;
  if (action.meta && action.meta.isServerAction) {
    const user = store.getState().user;
    updatedAction = Object.assign({}, action, { meta: { user } });
    send(updatedAction);
  } else {
    updatedAction = action;
  }

  return next(updatedAction);
};

export const actionFormatValidator = store => next => action => {
  if (! action.payload || !action.type) {
    console.error('Action received which does not contain a payload, this is probably a mistake', action);
  }
  return next(action);
};
