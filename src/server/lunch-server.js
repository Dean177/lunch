import express from 'express';
import favicon from 'serve-favicon';
import { Server } from 'http';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.dev.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import configureWebsocket from './websocketHandler';

const app = express();
const lunchServer = new Server(app);
configureWebsocket(lunchServer);

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

export default lunchServer;
