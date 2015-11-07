import express from 'express';
import debug from 'debug';
import favicon from 'serve-favicon';
import { Server } from 'http';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.dev.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import configureWebsocket from './websocketHandler';

const app = express();
const dBug = debug('lunch:express');
const lunchServer = new Server(app);
configureWebsocket(lunchServer);

app.use(favicon(`${__dirname}/favicon.ico`));
dBug(`Running in ${process.env.NODE_ENV}`);


if (process.env.NODE_ENV === JSON.stringify('production')) {
  app.use(express.compress());
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
