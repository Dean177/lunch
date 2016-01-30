import { v4 as uuid } from 'node-uuid';
const debug = require('debug')('lunch:repository:LunchOptionRepo');
const db = require('./db');

export const isExistingOption = (optionName) => {
  return db('lunch_options')
    .where('name', 'ilike', optionName)
    .select()
    .limit(1)
    .then((existingOptions) => (existingOptions.length === 1 ? existingOptions[0] : false));
};

export const updateLastChosen = (lunchOptionId) => {
  return db('lunch_options').where({ id: lunchOptionId }).update({ lastChosen: new Date().getTime() });
};

export const add = (name) => {
  return isExistingOption(name).then((existingOption) => {
    if (existingOption) {
      debug(`${name} already exists, updating last chosen`);
      return updateLastChosen(existingOption.id).then(() => existingOption);
    }

    const newLunchOption = { id: uuid(), name, lastChosen: new Date().getTime() };
    debug(`${name} already exists, updating last chosen`);
    return db('lunch_options').insert(newLunchOption).then(() => {
      return newLunchOption;
    });
  });
};

export const getAll = (cutoffTime) => db('lunch_options').where('lastChosen', '>', cutoffTime);
