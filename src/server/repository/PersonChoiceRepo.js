import { v4 as uuid } from 'node-uuid';
const db = require('./db');
const debug = require('debug')('lunch:PersonChoiceRepo');

export const getAll = (cutoffTime) => db('people_choices').where('dateChosen', '>', cutoffTime);

export const add = ({ person, choiceId, orderDetails, paymentAmount, isFetching }) => {
  debug(`User: ${person.name} has made initial choice ${choiceId}`);
  const newPersonChoice = {
    id: uuid(),
    orderDetails: orderDetails || '',
    paymentAmount: paymentAmount || '',
    isFetching: isFetching || false,
    userId: person.id,
    lunchOptionId: choiceId,
    dateChosen: new Date().getTime(),
  };

  return db('people_choices').insert(newPersonChoice).then(() => newPersonChoice);
};

export const clearFetchers = (userId, lunchOptionId) => {
  debug(`${userId} is no longer offering to get option ${lunchOptionId}`);

  // TODO move this to a shared file
  const fourHours = 4 * 60 * 60 * 1000;
  const cutoffTime = new Date().getTime() - fourHours;

  return db('people_choices')
    .where('dateChosen', '>', cutoffTime)
    .andWhere({ userId, lunchOptionId })
    .update({ isFetching: false });
};

// TODO also filter by cutoff amount?
export const findByPersonId = (userId) => {
  return db('people_choices').where({ userId }).then((users) => users.length ? users[0] : false);
};

export const updateChoiceId = (userId, lunchOptionId) => {
  debug(`${userId} update choice to ${lunchOptionId}`);
  return findByPersonId(userId).then((personChoice) => {
    if (!personChoice) {
      return add(userId, lunchOptionId);
    }

    const personChoiceUpdate = { lunchOptionId, dateChosen: new Date().getTime() };
    return db()
      .where({ userId, lunchOptionId: personChoice.lunchOptionId })
      .update(personChoiceUpdate)
      .then(() => ({ ...personChoice, ...personChoiceUpdate }));
  });
};

export const updateOrderDetails = (userId, orderDetails) => {
  debug(`${userId} update orderDetails to ${orderDetails}`);
  return findByPersonId(userId).then((personChoice) => {
    if (!personChoice) {
      return Promise.reject(new Error(`${userId} updated orderDetails without making a selection`));
    }

    return db()
      .where({ userId, lunchOptionId: personChoice.lunchOptionId })
      .update({ orderDetails })
      .then(() => ({ ...personChoice, orderDetails }));
  });
};

export const updatePaymentAmount = (userId, paymentAmount) => {
  debug(`${userId} changed paymentAmount to ${paymentAmount}`);
  return findByPersonId(userId).then((personChoice) => {
    if (!personChoice) {
      return Promise.reject(new Error(`${userId} updated payment without making a selection`));
    }

    return db('people_choices')
      .where({ userId, lunchOptionId: personChoice.lunchOptionId })
      .update({ paymentAmount })
      .then(() => ({ ...personChoice, paymentAmount }));
  });
};

export const updateWhoIsFetchingLunch = (userId, lunchOptionId) => {
  debug(`${userId} is getting lunch for option ${lunchOptionId}`);
  return Promise.all([
    db('peopleChoices')
      .whereNot({ userId })
      .andWhere({ lunchOptionId })
      .update({ isFetching: false }),
    db('peopleChoices')
      .where({ userId })
      .andWhere({ lunchOptionId })
      .update({ isFetching: true }),
  ]);
};

export const updateGoneToFetchLunch = (userId, lunchOptionId) => {
  debug(`${userId} has left to get lunch for option ${lunchOptionId}`);
  return Promise.resolve(true);
};
