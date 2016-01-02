import debug from 'debug';
import { v4 as uuid } from 'node-uuid';
import getOptionChoicesMessage from '../actionHandlers/getOptionChoicesMessage';
import getActionHandler from './getActionHandler';
import actionHandlers from '../actionHandlers';
import { Action } from '../../shared/constants/WeboscketMessageTypes';


const dBug = debug('lunch:socket-io');
const actionHandler = getActionHandler(actionHandlers);

function sendCurrentState(emitter) {
  return getOptionChoicesMessage().then(action => { emitter.emit(Action, action); });
}

export default function configureWebsocket(io) {
  const connections = {};
  // Necessary because old lunchOptions & personChoices are pruned regularly
  setInterval(sendCurrentState.bind(this, io), 60 * 1000);

  const serverActionHandler = actionHandler(io);

  io.on('connection', (socket) => {
    const socketActionHandler = serverActionHandler(socket);
    const socketId = uuid();
    connections[socketId] = { socket };

    socket.on('error', dBug);
    socket.on('close', () => { delete connections[socketId]; });
    socket.on(Action, (action) => {
      socketActionHandler(action);
      // TODO have each action handler send other clients the minimal necessary info,
      // rather than re-emitting the entire state
      sendCurrentState(socket);
    });

    sendCurrentState(socket);
  });

  return io;
}
