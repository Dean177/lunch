import * as debug from 'debug';
import * as socketIo from 'socket.io';
import onAddLunchOption from './event-handlers/onAddLunchOption';
import onChangeImageUrl from './event-handlers/onChangeImageUrl';
import onChangeName from './event-handlers/onChangeName';
import onUserLunchChoice from './event-handlers/onUserLunchChoice';
import * as uuid from 'node-uuid';
import {
  OptionChoices, AddLunchOption, UserLunchChoice, ChangeName, ChangeImageUrl,
} from '../shared/constants/actionTypes';

const dBug = debug('lunch:socket-io');

let lunchOptions = [
  { id: '1', name: 'Boots', lastChosen: new Date()},
  { id: '2', name: 'Chinese', lastChosen: new Date()},
];

let peopleChoices = [];

export default function configureWebsocket(httpServer) {
  const io = socketIo(httpServer);
  const connections = {};

  io.on('connection', (socket) => {
    socket.on('error', dBug);
    const socketId = uuid.v4();
    connections[socketId] = socket;

    // Send current state to the client
    socket.send({
      type: OptionChoices,
      payload: {
        lunchOptions,
        peopleChoices,
      },
    });

    socket.on('message', (action: Action) => {
      if (! action.type || !action.payload || !action.meta || !action.meta.user) {
        dBug('Potentially malformed action received', JSON.stringify(action, null, 2));
      }

      switch (action.type) {
      case AddLunchOption: {
        onAddLunchOption(socket, action, peopleChoices, lunchOptions);
        break;
      }
      case UserLunchChoice: {
        onUserLunchChoice(socket, action, peopleChoices, lunchOptions);
        break;
      }
      case ChangeName: {
        onChangeName(io, action, peopleChoices, lunchOptions);
        break;
      }
      case ChangeImageUrl: {
        onChangeImageUrl(io, action, peopleChoices, lunchOptions);
        break;
      }
      default: {
        dBug('Unrecognised action type', action);
      }
      }
    });

    socket.on('close', () => {
      delete connections[socketId];
    });
  });

  return io;
}
