import { v4 as uuid } from 'node-uuid';
import * as _ from 'underscore';
import debug from 'debug';
const dBug = debug('lunch:repository:LunchOptionRepo');

const lunchOptions = [
  { id: '1', name: 'Boots', lastChosen: new Date().getTime(), keep: true },
  { id: '2', name: 'Chinese', lastChosen: new Date().getTime(), keep: true },
];

export const add = (name) => {
  const newLunchOption = { id: uuid(), name, lastChosen: new Date().getTime() };
  lunchOptions.push(newLunchOption);
  return newLunchOption;
};

export const getAll = (cutoffTime) => {
  return lunchOptions.filter(option => {
    return option.keep || (option.lastChosen && option.lastChosen > cutoffTime);
  });
};

export const updateLastChosen = (lunchOptionId) => {
  const updatedOption = _.find(lunchOptions, (lunchOption) => lunchOption.id === lunchOptionId);
  if (!updatedOption) {
    dBug("Attempted to update option which doesn't exist", lunchOptionId);
  }

  updatedOption.lastChose = new Date().getTime();
  return updatedOption;
};

export const findByName = (optionName) => {
  return _.find(lunchOptions, (lunchOption) => optionName === lunchOption.name);
};
