import getOptionChoicesMessage from './actionCreators/getOptionChoicesMessage';
import { Action } from '../shared/constants/WeboscketMessageTypes';
const logger = require('./logger')('websocketHandler');
const socketIo = require('socket.io');

export function validateActionFormat(action, onError) {
  if (!action.type || !action.payload || !action.meta || !action.meta.user) {
    onError(action);
  }
}

function onInvalidAction(action) {
  logger.info('Potentially malformed action received', JSON.stringify(action, null, 2));
}

export function getSocketActionHandler(actionHandlers, websockets) {
  return (socket) => (action) => {
    validateActionFormat(action, onInvalidAction);
    if (!actionHandlers.hasOwnProperty(action.type)) {
      return logger.info('Unrecognised client action', action);
    }

    logger.info(`Action: ${action.type} from ${action.meta.user.name}`);
    return actionHandlers[action.type](websockets, socket, action);
  };
}

export function sendCurrentState(emitter) {
  return getOptionChoicesMessage().then(action => {
    emitter.emit(Action, action);
  });
}

export const getWebsocketHandler = (getActionHandlerForSocket) => (websocket) => {
  websocket.on('error', (err) => { logger.error(err); });
  websocket.on(Action, getActionHandlerForSocket(websocket));

  sendCurrentState(websocket);
};

export default function configureWebsockets(lunchServer, actionHandlers) {
  const websockets = socketIo(lunchServer, {});
  // Necessary because old lunchOptions & personChoices are pruned regularly
  setInterval(sendCurrentState.bind(this, websockets), 60 * 1000);

  const socketActionHandler = getSocketActionHandler(actionHandlers, websockets);
  websockets.on('connection', getWebsocketHandler(socketActionHandler));

  return websockets;
}
