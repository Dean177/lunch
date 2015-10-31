import debug from 'debug';
import express from 'express';
import favicon from 'serve-favicon';
import { find } from 'underscore';
import socketIo from 'socket.io';
import { Server } from 'http';
import upsert from '../shared/util/upsert';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.dev.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { OptionChoices, AddLunchOption, UserLunchChoice, ChangeName, ChangeImageUrl } from '../shared/constants/actionTypes';

const dBug = debug('lunch:server');
const app = express();
const http = new Server(app);
const io = socketIo(http);

app.use(favicon(`${__dirname}/favicon.ico`));
if (process.env.NODE_ENV === JSON.stringify('production')) {
  app.use('/assets', express.static('../client'));
} else {
  const compiler = webpack(webpackConfig);
  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
}

app.get('*', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
});

let lunchOptions = [
  { id: '1', name: 'Boots', lastChosen: new Date()},
  { id: '3', name: 'Chinese', lastChosen: new Date()},
];

let peopleChoices = [];

io.on('connection', (socket) => {
  socket.on('error', dBug);

  // Send current state to the client
  socket.send({
    type: OptionChoices,
    payload: {
      lunchOptions,
      peopleChoices,
    },
  });

  socket.on('message', (action) => {
    if (! action.type || !action.payload || !action.meta || !action.meta.user) {
      dBug('Potentially malformed action received', JSON.stringify(action, null, 2));
    }

    const { type, payload, meta } = action;

    switch (type) {
    case AddLunchOption: {
      const { user } = meta;
      const option = find(lunchOptions, ({ name }) => name === payload.name);
      if (option) {
        peopleChoices = upsert(
          peopleChoices,
          (personChoice) => (personChoice.person.id === user.id),
          {person: user, choiceId: option.id, lastChosen: new Date()}
        );
      } else {
        lunchOptions = [...lunchOptions, {id: payload.id, name: payload.name}];
        peopleChoices = upsert(
          peopleChoices,
          (personChoice) => (personChoice.person.id === user.id),
          {person: user, choiceId: payload.id}
        );
      }

      socket.broadcast.send({type: OptionChoices, payload: {lunchOptions, peopleChoices}});
      break;
    }

    case UserLunchChoice: {
      const { person, choiceId } = payload;
      const chosen = find(lunchOptions, (lunchOption) => (lunchOption.id === choiceId));
      peopleChoices = upsert(peopleChoices, (personChoice) => (personChoice.person.id === person.id), { person, choiceId });
      lunchOptions = upsert(lunchOptions, (lunchOption) => (lunchOption.id === choiceId), Object.assign({}, chosen, { lastChosen: new Date() }));
      socket.broadcast.send({ type: OptionChoices, payload: { peopleChoices, lunchOptions } });
      break;
    }

    case ChangeName: {
      const { id, name } = payload;
      const personChoice = find(peopleChoices, (pChoice) => (pChoice.person.id === id));
      peopleChoices = upsert(peopleChoices, (pChoice) => (pChoice.person.id === id), {
        person: {id, name},
        choiceId: personChoice.choiceId,
      });
      socket.broadcast.send({type: OptionChoices, payload: {peopleChoices, lunchOptions}});
      break;
    }

    case ChangeImageUrl: {
      const personChoice = find(peopleChoices, (pChoice) => (pChoice.person.id === payload.id));
      peopleChoices = upsert(peopleChoices, (pChoice) => (pChoice.person.id === payload.id), {
        person: {
          id: payload.id,
          imageUrl: payload.url,
        },
        choiceId: personChoice.choiceId,
      });
      socket.broadcast.send({type: OptionChoices, payload: {peopleChoices, lunchOptions}});
      break;
    }

    default: {
      dBug('Unrecognised action type', action);
    }
    }
  });
});

export function start(serverPort, callback) {
  http.listen(serverPort, callback);
}

export function stop() {
  http.close();
}
