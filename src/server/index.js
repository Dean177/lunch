if (process.env.NODE_ENV !== 'production') {
  require('source-map-support').install();
}
require('dotenv').config({ path: '../ENV', silent: true });
const debug = require('debug')('lunch:index');
const db = require('./repository/db');
import lunchServer from './lunch-server';
const serverPort = process.env.PORT || 3333;

debug("Running migrations");
db.migrate.latest()
  .then(() => {
  debug("Migrations completed successfully");
  lunchServer.listen(serverPort, (err) => {
    if (err) { throw err; }
    debug(`Lunch listening on port ${serverPort}`);
  });
});
