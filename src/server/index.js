if (process.env.NODE_ENV !== 'production') {
  require('source-map-support').install();
}
import debug from 'debug';
import { serverPort } from '../shared/constants/config';
import lunchServer from './lunch-server';

lunchServer.listen(process.env.PORT || serverPort,
  () => { debug('lunch:index')(`Lunch listening on port ${serverPort}`); }
);
