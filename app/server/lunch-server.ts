///<reference path="../../typings/tsd.d.ts" />
import * as compression from 'compression';
import * as express from 'express';
import * as debug from 'debug';
import * as favicon from 'serve-favicon';
import { Server } from 'http';
import * as path from 'path';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import configureWebsocket from './websocketHandler';

const webpackConfig = require('../../config/webpack.dev.js');
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
  const compiler = webpack(webpackConfig);
  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
}

app.get('/*', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
});

export default lunchServer;
