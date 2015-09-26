import express from 'express';
import { Server } from 'http';
import socketIo from 'socket.io';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.config.dev.js';
import { AddLunchOption } from '../shared/constants/actionTypes';


const app = express();
const http = new Server(app);
const io = socketIo(http);
const compiler = webpack(config);

app.use(webpackHotMiddleware(compiler));
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.get('*', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
});

io.on('connection', (socket) => {
  socket.on(AddLunchOption, (action) => {
    console.log(action);
  });
});

http.listen(3000, () => { console.log('Lunchwire listening'); });
