import debug from 'debug';
import { v4 as uuid } from 'node-uuid';
import getOptionChoicesMessage from './actionCreators/getOptionChoicesMessage';
import { Action } from '../shared/constants/WeboscketMessageTypes';

const dBug = debug('lunch:configureWebsockets');

export function validateActionFormat(action, onError) {
  if (!action.type || !action.payload || !action.meta || !action.meta.user) {
    onError(action);
  }
}

function onInvalidAction(action) {
  dBug('Potentially malformed action received', JSON.stringify(action, null, 2));
}

export function configureActionHandlers(actionHandlers, websockets) {
  return (socket) => (action) => {
    validateActionFormat(action, onInvalidAction);
    if (!actionHandlers.hasOwnProperty(action.type)) {
      return dBug('Unrecognised client action', action);
    }

    dBug(`Action: ${action.type} from ${action.meta.user.name}`);
    return actionHandlers[action.type](websockets, socket, action);
  };
}

export function sendCurrentState(emitter) {
  return getOptionChoicesMessage().then(action => {
    emitter.emit(Action, action);
  });
}

export const getWebsocketHandler = (connections, getActionHandlerForSocket) => (websocket) => {
  const socketId = uuid();
  connections[socketId] = { websocket };
  websocket.on('error', dBug);
  websocket.on('close', () => { delete connections[socketId]; });
  websocket.on(Action, getActionHandlerForSocket(websocket));

  sendCurrentState(websocket);
};

export default function configureWebsockets(websockets, actionHandlers) {
  const connections = {};
  // Necessary because old lunchOptions & personChoices are pruned regularly
  setInterval(sendCurrentState.bind(this, websockets), 60 * 1000);

  websockets.on('connection', getWebsocketHandler(connections, configureActionHandlers(actionHandlers, websockets)));

  return websockets;
}
