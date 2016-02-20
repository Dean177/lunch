const logger = require('./logger')('environment-config');
require('dotenv').config({ path: './ENV', silent: true });

const {
  DATABASE_URL,
  PORT,
  NODE_ENV,
  SPLITWISE_CONSUMER_KEY,
  SPLITWISE_CONSUMER_SECRET,
} = process.env;

if (!DATABASE_URL) {
  logger.error('Environment did not provide a DATABASE_URL');
}

if (!PORT) {
  logger.warn('Environment did not provide a port');
}

if (!NODE_ENV) {
  logger.error('Environment did not provide a NODE_ENV');
} else {
  logger.info(`Running in ${process.env.NODE_ENV}`);
}

if (!SPLITWISE_CONSUMER_KEY || !SPLITWISE_CONSUMER_SECRET) {
  logger.error('Environment did not provide splitwise api key & secret');
}
