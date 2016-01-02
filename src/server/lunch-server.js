import debug from 'debug';
import express from 'express';
import favicon from 'serve-favicon';
import { Server } from 'http';
import socketIo from 'socket.io';
import path from 'path';

import actionHandlers from './actionHandlers';
import configureWebsocket from './websocketHandler';

const app = express();
const dBug = debug('lunch:express');

app.use(favicon(`${__dirname}/favicon.ico`));
dBug(`Running in ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === JSON.stringify('production')) {
  const assetPath = path.normalize(path.join(__dirname, '../client'));
  dBug(`Serving assets from ${assetPath}`);
  app.use(require('compression')());
  app.use('/assets', express.static(assetPath));
} else {
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack.config.dev.js');
  const compiler = webpack(webpackConfig);
  dBug('Serving assets from webpack');
  app.use(require('webpack-dev-middleware')(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(require('webpack-hot-middleware')(compiler, { noInfo: true }));
}

app.get('/*', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
});

const lunchServer = new Server(app);
const websocket = socketIo(lunchServer);
configureWebsocket(websocket, actionHandlers);

export default lunchServer;
