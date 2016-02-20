const express = require('express');
const favicon = require('serve-favicon');
const logger = require('./logger')('lunch-server');
const path = require('path');
const { Server } = require('http');

const app = express();

app.use(favicon(`${__dirname}/favicon.ico`));
if (process.env.NODE_ENV === 'production') {
  const assetPath = path.normalize(path.join(__dirname, '../client'));
  logger.info(`Serving assets from ${assetPath}`);
  app.use(require('compression')());
  app.use('/assets', express.static(assetPath));
} else {
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack.config.dev.js');
  const devMiddleware = require('webpack-dev-middleware');
  const hotloaderMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  logger.info('Serving assets from webpack');
  app.use(devMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(hotloaderMiddleware(compiler));
}

app.get('/status', (req, res) => { res.send('hungry'); });

app.get('/*', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
});

const lunchServer = new Server(app);
const configureWebsocket = require('./websocketHandler').default;
configureWebsocket(lunchServer);

module.exports = lunchServer;
