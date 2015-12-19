import debug from 'debug';
import { find } from 'underscore';
import socketIo from 'socket.io';
import { v4 as uuid } from 'node-uuid';
import upsert from '../shared/util/upsert';
import {
  OptionChoices, AddLunchOption, UserLunchChoice, ChangeName, ChangeImageUrl,
} from '../shared/constants/actionTypes';

const dBug = debug('lunch:socket-io');

let lunchOptions = [
  { id: '1', name: 'Boots', lastChosen: new Date(), keep: true },
  { id: '2', name: 'Chinese', lastChosen: new Date(), keep: true },
];

let peopleChoices = [];

export default function configureWebsocket(httpServer) {
  const io = socketIo(httpServer);
  const connections = {};

  function getOptionChoicesMessage() {
    return {
      type: OptionChoices,
      payload: {
        lunchOptions,
        peopleChoices,
      },
    };
  }

  function updateClients() {
    io.emit('message', getOptionChoicesMessage());
  }

  io.on('connection', (socket) => {
    socket.on('error', dBug);
    const socketId = uuid();
    connections[socketId] = socket;

    // Send current state to the client
    socket.send(getOptionChoicesMessage());

    socket.on('message', (action) => {
      const { type, payload, meta } = action;
      const now = new Date();
      if (!type || !payload || !meta || !meta.user) {
        dBug('Potentially malformed action received', JSON.stringify(action, null, 2));
      }

      switch (type) {
        case AddLunchOption: {
          const { user } = meta;
          const option = find(lunchOptions, ({ name }) => name === payload.name);
          if (option) {
            peopleChoices = upsert(
              peopleChoices,
              (personChoice) => (personChoice.person.id === user.id),
              { person: user, choiceId: option.id, dateChosen: now }
            );
          } else {
            lunchOptions = [...lunchOptions, { id: payload.id, name: payload.name, lastChosen: now }];
            peopleChoices = upsert(
              peopleChoices,
              (personChoice) => (personChoice.person.id === user.id),
              { person: user, choiceId: payload.id, dateChosen: now }
            );
          }
          break;
        }

        case UserLunchChoice: {
          const { person, choiceId } = payload;
          const chosen = find(lunchOptions, (lunchOption) => (lunchOption.id === choiceId));
          peopleChoices = upsert(peopleChoices, (personChoice) => (personChoice.person.id === person.id), { person, choiceId, dateChosen: new Date() });
          lunchOptions = upsert(lunchOptions, (lunchOption) => (lunchOption.id === choiceId), Object.assign({}, chosen, { lastChosen: now }));
          break;
        }

        case ChangeName: {
          const { id, name } = payload;
          const personChoice = find(peopleChoices, (pChoice) => (pChoice.person.id === id));
          peopleChoices = upsert(peopleChoices, (pChoice) => (pChoice.person.id === id), {
            person: { id, name },
            choiceId: personChoice.choiceId,
            dateChosen: now,
          });
          break;
        }

        case ChangeImageUrl: {
          dBug(`${payload.id} changed their user image.`);
          const personChoice = find(peopleChoices, (pChoice) => (pChoice.person.id === payload.id));
          peopleChoices = upsert(peopleChoices, (pChoice) => (pChoice.person.id === payload.id), {
            person: {
              id: payload.id,
              imageUrl: payload.url,
            },
            choiceId: personChoice.choiceId,
            dateChosen: personChoice.dateChosen,
          });

          break;
        }

        default: {
          dBug('Unrecognised action type', action);
        }
      }

      updateClients();
    });

    socket.on('close', () => {
      delete connections[socketId];
    });
  });

  setInterval(() => {
    const cutoffTime = (new Date()).getTime() - 4 * 60 * 60 * 1000;

    lunchOptions = lunchOptions.filter(option => option.keep || option.lastChosen.getTime() > cutoffTime);
    peopleChoices = peopleChoices.filter(personChoice => personChoice.dateChosen.getTime() > cutoffTime);
    updateClients();
  }, 60 * 1000);

  return io;
}
