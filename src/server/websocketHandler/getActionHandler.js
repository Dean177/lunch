import debug from 'debug';
const dBug = debug('lunch:actionHandler');

export function validateActionFormat(action, onError) {
  if (!action.type || !action.payload || !action.meta || !action.meta.user) {
    onError(action);
  }
}

function onInvalidAction(action) {
  dBug('Potentially malformed action received', JSON.stringify(action, null, 2));
}

export default function getActionHandler(actionHandlers) {
  return (io) => (socket) => (action) => {
    validateActionFormat(action, onInvalidAction);
    if (!actionHandlers.hasOwnProperty(action.type)) {
      return dBug('Unrecognised client action', action);
    }

    dBug(`Action: ${action.type} from ${action.meta.user.name}`);
    actionHandlers[action.type](io, socket, action);
  };
}
