import express from 'express';
import favicon from 'serve-favicon';
import { find } from 'underscore';
import socketIo from 'socket.io';
import { Server } from 'http';
import { serverPort } from '../shared/constants/config';
import upsert from '../shared/util/upsert';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.dev.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { OptionChoices, AddLunchOption, UserLunchChoice } from '../shared/constants/actionTypes';
import debug from 'debug';
const dBug = debug('lunch:server');

const app = express();
const http = new Server(app);
const io = socketIo(http);
const compiler = webpack(webpackConfig);

app.use(favicon(`${__dirname}/favicon.ico`));
app.use(webpackHotMiddleware(compiler));
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));

app.get('*', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
});

let lunchOptions = [ { id: '1', name: 'Boots'}, { id: '3', name: 'Chinese'}];
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
    case AddLunchOption:
      const { user } = meta;
      const option = find(lunchOptions, ({ name }) => name === payload.name);
      if (option) {
        peopleChoices = upsert(
          peopleChoices,
          (personChoice) => (personChoice.person.id === user.id),
          { person: user, choiceId: option.id }
        );
      } else {
        lunchOptions = [ ...lunchOptions, { id: payload.id, name: payload.name } ];
        peopleChoices = upsert(
          peopleChoices,
          (personChoice) => (personChoice.person.id === user.id),
          { person: user, choiceId: payload.id }
        );
      }

      socket.broadcast.send({ type: OptionChoices, payload: { lunchOptions, peopleChoices } });
      break;

    case UserLunchChoice:
      const { person, choiceId } = payload;
      peopleChoices = upsert(peopleChoices, (personChoice) => (personChoice.person.id === person.id), { person, choiceId });
      socket.broadcast.send({ type: OptionChoices, payload: { peopleChoices, lunchOptions } });
      break;

    default:
      dBug('Unrecognised action type');
    }
  });
});

http.listen(serverPort, () => { dBug(`Lunch listening on port ${serverPort}`); });
