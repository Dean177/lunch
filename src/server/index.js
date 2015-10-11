import express from 'express';
import { Server } from 'http';
import favicon from 'serve-favicon';
import socketIo from 'socket.io';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { serverPort } from '../shared/constants/config';
import webpackConfig from '../../webpack.config.dev.js';
import { find } from 'underscore';
import upsert from '../shared/util/upsert';
import { OptionChoices, AddLunchOption, ChooseLunchOption, UserLunchChoice, RemoteLunchChoice } from '../shared/constants/actionTypes';
import config from '../../webpack.config.dev.js';


const app = express();
const http = new Server(app);
const io = socketIo(http);
const compiler = webpack(webpackConfig);

app.use(favicon(`${__dirname}/favicon.ico`));
app.use(webpackHotMiddleware(compiler));
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.get('*', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
});

let lunchOptions = [ { id: '1', name: 'Boots'}, { id: '3', name: 'Chinese'}];
let peopleChoices = [];


io.on('connection', (socket) => {
  // Send current state to the client
  socket.send({
    type: OptionChoices,
    payload: {
      lunchOptions,
      peopleChoices
    },
  });

  socket.on('message', (action) => {
    if (! action.type || !action.payload || !action.meta) {
      console.error('Potentially malformed action received', action);
    }

    const { type, payload, meta } = action;

    switch (type) {
      case AddLunchOption:
        const { id, name } = payload;
        lunchOptions = upsert(lunchOptions, lunchOption => lunchOption.id === id, payload);

        const option = find(lunchOptions, ({ name }) => name === action.name);
        if (!option) {
          lunchOptions.push({ id: action.id, name: action.name });
          // TODO
          socket.broadcast.send(action);
        }

        peopleChoices = upsert(peopleChoices, ({ person }) => person.id === action.person.id, { person: action.person, choiceId: action.choiceId});
        socket.broadcast.send({ ...action, type: RemoteLunchChoice });
        break;

      case ChooseLunchOption:
        const newPersonChoice = {
          person: meta.user,
          choiceId: payload.id,
        };
        peopleChoices = upsert(peopleChoices, (personChoice => personChoice.user.id === meta.user.id), newPersonChoice);
        socket.broadcast.send({
          type: UserLunchChoice,
          payload: newPersonChoice,
        });
        break;

      default:
        console.error('Unrecognised action type');
    }
  });
});

io.on('error', console.error);

http.listen(serverPort, () => { console.log('Lunch listening'); });
