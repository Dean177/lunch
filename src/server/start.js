require('./environment-config');
if (process.env.NODE_ENV !== 'production') {
  require('source-map-support').install();
}
const logger = require('./logger')('index.js');

const db = require('./repository/db');
const lunchServer = require('./lunch-server');
const serverPort = process.env.PORT || 3333;

logger.info('Running migrations');
db.migrate.latest().then(() => {
  logger.info('Migrations completed successfully');
}).then(() => {
  logger.info('Starting Lunch');
  lunchServer.listen(serverPort, (err) => {
    if (err) { throw err; }
    logger.info(`Lunch listening on port ${serverPort}`);
  });
}).catch((err) => {
  logger.error(err);
  process.exit(1);
});
