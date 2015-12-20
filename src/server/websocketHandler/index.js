import debug from 'debug';
import { v4 as uuid } from 'node-uuid';
import getOptionChoicesMessage from '../actionHandlers/getOptionChoicesMessage';
import getActionHandler from './getActionHandler';
import actionHandlers from '../actionHandlers';

const dBug = debug('lunch:socket-io');
const actionHandler = getActionHandler(actionHandlers);

function updateClients(io) { io.emit('message', getOptionChoicesMessage()); }

export default function configureWebsocket(io) {
  const connections = {};

  setInterval(updateClients.bind(this, io), 60 * 1000);
  const serverActionHandler = actionHandler(io);

  io.on('connection', (socket) => {
    const socketActionHandler = serverActionHandler(socket);
    const socketId = uuid();
    connections[socketId] = socket;
    socket.on('error', dBug);
    socket.on('close', () => { delete connections[socketId]; });

    // Send current state to the client
    socket.send(getOptionChoicesMessage());

    socket.on('message', (action) => {
      socketActionHandler(action);
      updateClients(io);
    });
  });

  return io;
}
