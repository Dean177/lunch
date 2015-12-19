import compression from 'compression';
import debug from 'debug';
import express from 'express';
import favicon from 'serve-favicon';
import { Server } from 'http';
import path from 'path';

import configureWebsocket from './websocketHandler';

const app = express();
const dBug = debug('lunch:express');
const lunchServer = new Server(app);
configureWebsocket(lunchServer);

app.use(favicon(`${__dirname}/favicon.ico`));
dBug(`Running in ${process.env.NODE_ENV}`);


if (process.env.NODE_ENV === JSON.stringify('production')) {
  app.use(compression());
  const assetPath = path.normalize(path.join(__dirname, '../client'));
  dBug(`Serving assets from ${assetPath}`);
  app.use('/assets', express.static(assetPath));
} else {
  dBug('Serving assets from webpack');
  console.log('Serving assets from webpack');
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack.config.dev.js');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.get('/', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
});

export default lunchServer;
