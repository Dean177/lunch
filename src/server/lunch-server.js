import express from 'express';
import favicon from 'serve-favicon';
import { Server } from 'http';
import socketIo from 'socket.io';
import path from 'path';

import actionHandlers from './actionHandlers';
import configureWebsocket from './websocketHandler';

const app = express();
const logger = require('../../logger-config'); // ('lunch:express');

app.use(favicon(`${__dirname}/favicon.ico`));
logger.info(`Running in ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === 'production') {
  const assetPath = path.normalize(path.join(__dirname, '../client'));
  logger.info(`Serving assets from ${assetPath}`);
  app.use(require('compression')());
  app.use('/assets', express.static(assetPath));
} else {
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack.config.dev.js');
  const compiler = webpack(webpackConfig);
  logger.info('Serving assets from webpack');
  app.use(require('webpack-dev-middleware')(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(require('webpack-hot-middleware')(compiler, { noInfo: true }));
}

app.get('/status', (req, res) => { res.send('hungry'); });

app.get('/*', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
});

const lunchServer = new Server(app);
const websockets = socketIo(lunchServer);
configureWebsocket(websockets, actionHandlers);

export default lunchServer;
