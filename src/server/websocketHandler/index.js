import debug from 'debug';
import socketIo from 'socket.io';
import { v4 as uuid } from 'node-uuid';
const dBug = debug('lunch:socket-io');
import { OptionChoices } from '../../shared/constants/actionTypes';
import * as LunchOptionRepo from '../repository/LunchOptionRepo';
import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import getActionHandler from './getActionHandler';


function getOptionChoicesMessage() {
  const cutoffTime = (new Date()).getTime() - 4 * 60 * 60 * 1000;
  const lunchOptions = LunchOptionRepo.getAll(cutoffTime);
  const peopleChoices = PersonChoiceRepo.getAll(cutoffTime);
  return {
    type: OptionChoices,
    payload: {
      lunchOptions,
      peopleChoices,
    },
  };
}

function updateClients(io) { io.emit('message', getOptionChoicesMessage()); }

export default function configureWebsocket(httpServer) {
  const io = socketIo(httpServer);
  const connections = {};

  setInterval(updateClients.bind(this, io), 60 * 1000);
  const actionHandler = getActionHandler(io);

  io.on('connection', (socket) => {
    const socketActionHandler = actionHandler(socket);
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
