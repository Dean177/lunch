if (process.env.NODE_ENV !== 'production') {
  require('source-map-support').install();
}
const debug = require('debug')('lunch:index');
import { serverPort } from '../shared/constants/config';
import lunchServer from './lunch-server';

lunchServer.listen(serverPort, (err) => {
  if (err) {
    debug(err);
    throw err;
  }
  debug(`Lunch listening on port ${serverPort}`);
});
