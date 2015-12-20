import { v4 as uuid } from 'node-uuid';
import * as _ from 'underscore';
import debug from 'debug';
const dBug = debug('lunch:repository:LunchOptionRepo');

const lunchOptions = [
  { id: '1', name: 'Boots', lastChosen: new Date(), keep: true },
  { id: '2', name: 'Chinese', lastChosen: new Date(), keep: true },
];

export const add = (name) => {
  const newLunchOption = { id: uuid(), name };
  lunchOptions.push(newLunchOption);
  return newLunchOption;
};

export const getAll = (cutoffTime) => (lunchOptions.filter(option => option.keep || option.lastChosen.getTime() > cutoffTime));

export const update = (lunchOption) => {
  dBug('Not implemented yet', lunchOption);
};

export const findByName = (optionName) => {
  return _.find(lunchOptions, (lunchOption) => optionName === lunchOption.name);
};


