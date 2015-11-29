import * as debug from 'debug';
import lunchServer from './lunch-server';
const { serverPort } = require('../shared/constants/config');

lunchServer.listen(serverPort,
  () => { debug('lunch:index')(`Lunch listening on port ${serverPort}`); }
);
