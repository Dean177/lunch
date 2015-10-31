import debug from 'debug';
import { serverPort } from '../shared/constants/config';
import { start } from './lunch-server';

start(
  serverPort,
  () => { debug('lunch:index')(`Lunch listening on port ${serverPort}`); }
);
