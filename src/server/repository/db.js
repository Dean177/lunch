require('dotenv').config({ path: './ENV', silent: false });
const logger = require('../../../logger-config');
logger.warn("dbConnectionString", process.env.DATABASE_URL);
const config = require('../../../knexfile');
const db = require('knex')(config);

db.migrate.latest().then(() => {
  logger.info('Migrations completed successfully');
}).catch(logger.error);

module.exports = db;
