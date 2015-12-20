import actionHandlers from '../actionHandlers';
import debug from 'debug';
const dBug = debug('lunch:actionHandler');


function validateActionFormat(action) {
  if (!action.type || !action.payload || !action.meta || !action.meta.user) {
    dBug('Potentially malformed action received', JSON.stringify(action, null, 2));
  }
}

export default function getActionHandler(io) {
  return (socket) => (action) => {
    validateActionFormat(action);
    if (!actionHandlers.hasOwnProperty(action.type)) {
      dBug('Unrecognised client action', action);
    }

    dBug(`Action: ${action.type} from ${action.meta.user.name}`);

    actionHandlers[action.type](io, socket, action);
  };
}
