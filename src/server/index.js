import debug from 'debug';
import { serverPort } from '../shared/constants/config';
import lunchServer from './lunch-server';

lunchServer.listen(serverPort,
  () => { debug('lunch:index')(`Lunch listening on port ${serverPort}`); }
);
