const winston = require('winston');

const logger = new (winston.Logger)({
  level: 'info',
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
      colorize: true,
    }),
    new (winston.transports.File)({ filename: 'lunch.log' })
  ]
});

module.exports = logger;
