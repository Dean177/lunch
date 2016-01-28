import { v4 as uuid } from 'node-uuid';
import * as _ from 'underscore';
import debug from 'debug';
import Promise from 'promise';
const dBug = debug('lunch:repository:LunchOptionRepo');

const lunchOptions = [
  { id: '1', name: 'Boots', lastChosen: new Date().getTime(), keep: true },
  { id: '2', name: 'Chinese', lastChosen: new Date().getTime(), keep: true },
];

export const add = (name) => {
  const newLunchOption = { id: uuid(), name, lastChosen: new Date().getTime() };
  lunchOptions.push(newLunchOption);
  return Promise.resolve(newLunchOption);
};

export const getAll = (cutoffTime) => {
  const opts = lunchOptions.filter(option => (
    option.keep || (option.lastChosen && option.lastChosen > cutoffTime)
  ));

  return Promise.resolve(opts || []);
};

export const updateLastChosen = (lunchOptionId) => {
  const updatedOption = _.find(lunchOptions, (lunchOption) => lunchOption.id === lunchOptionId);
  if (!updatedOption) {
    const message = `Attempted to update option which doesn't exist: ${lunchOptionId}`;
    dBug(message);
    return Promise.reject(new Error(message));
  }

  updatedOption.lastChose = new Date().getTime();
  return Promise.resolve(updatedOption);
};

export const findByName = (optionName) => {
  return Promise.resolve(
    _.find(lunchOptions, (lunchOption) => optionName === lunchOption.name)
  );
};
