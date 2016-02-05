import { v4 as uuid } from 'node-uuid';
const db = require('./db');
const logger = require('../../../logger-config');

export const isExistingOption = (optionName) => {
  return db('lunch_options')
    .where('name', 'ilike', optionName)
    .select()
    .limit(1)
    .then((existingOptions) => (existingOptions.length === 1 ? existingOptions[0] : false));
};

export const updateLastChosen = (lunchOptionId) => {
  return db('lunch_options')
    .where({ id: lunchOptionId })
    .update({ lastChosen: new Date().getTime() })
    .then(() => lunchOptionId);
};

export const add = (name) => {
  return isExistingOption(name).then((existingOption) => {
    if (existingOption) {
      logger.info(`${name} already exists, updating last chosen`);
      return updateLastChosen(existingOption.id).then(() => existingOption);
    }

    const newLunchOption = { id: uuid(), name, lastChosen: new Date().getTime() };
    logger.info(`Inserting ${name} into db`, newLunchOption);
    return db('lunch_options')
      .insert(newLunchOption)
      .then(() => newLunchOption);
  });
};

export const getAll = (cutoffTime) => db('lunch_options')
  .where('lastChosen', '>', cutoffTime)
  .map((lunchOption) => ({ ...lunchOption, lastChosen: parseInt(lunchOption.lastChosen) }));
