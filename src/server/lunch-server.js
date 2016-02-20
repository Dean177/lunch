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
  const compiler = webpack(webpackConfig);
  logger.info('Serving assets from webpack');
  app.use(
    require('webpack-dev-middleware')(
      compiler,
      { noInfo: true, publicPath: webpackConfig.output.publicPath }
    )
  );
  app.use(require('webpack-hot-middleware')(compiler, { noInfo: true }));
}

app.get('/status', (req, res) => { res.send('hungry'); });

app.get('/*', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
});

const lunchServer = new Server(app);


const actionHandlers = require('./actionHandlers');
const configureWebsocket = require('./websocketHandler').default;
configureWebsocket(lunchServer, actionHandlers);

module.exports = lunchServer;
