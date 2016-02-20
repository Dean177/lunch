const winston = require('winston');

const loggerConfig = new (winston.Logger)({
  level: 'info',
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
      colorize: true,
    }),
    new (winston.transports.File)({ filename: 'lunch.log' }),
  ],
});

const { debug, info, warn, error } = loggerConfig;

const getLogger = (source) => Object.assign({}, loggerConfig, {
  debug: debug.bind(null, `${source}:`),
  info: info.bind(null, `${source}:`),
  warn: warn.bind(null, `${source}:`),
  error: error.bind(null, `${source}:`),
});

module.exports = getLogger;
