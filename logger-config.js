const winston = require('winston');

const logger = new (winston.Logger)({
  level: 'info',
  transports: [
    new (winston.transports.Console)({ timestamp: true, level: 'info', colorize: true }),
    new (winston.transports.File)({ filename: 'lunch.log' })
  ]
});

module.exports = logger;
