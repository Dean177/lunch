const uuid = require('node-uuid').v4;
const db = require('./db');
const logger = require('../../../logger-config');

export const getAll = (cutoffTime) => db('people_choices')
  .where('dateChosen', '>', cutoffTime)
  .leftJoin('users', 'people_choices.userId', 'users.id')
  .map(({ id, orderDetails, paymentAmount, isFetching, dateChosen, lunchOptionId, userId, name, imageUrl }) => {
    return {
      id,
      orderDetails,
      paymentAmount,
      isFetching,
      dateChosen: parseInt(dateChosen),
      lunchOptionId,
      person: { id: userId, name, imageUrl },
    };
  }).then((result) => {
    return result;
  });


export const add = (userId, lunchOptionId, orderDetails = '', paymentAmount = '', isFetching = false) => {
  logger.info(`User: ${userId} has made initial choice ${lunchOptionId}`);
  const newPersonChoice = {
    id: uuid(),
    orderDetails,
    paymentAmount,
    isFetching,
    userId,
    lunchOptionId,
    dateChosen: new Date().getTime(),
  };

  return db('people_choices')
    .insert(newPersonChoice)
    .then(() => newPersonChoice);
};

export const clearFetchers = (userId, lunchOptionId) => {
  logger.info(`${userId} is no longer offering to get option ${lunchOptionId}`);

  // TODO move this to a shared file
  const fourHours = 4 * 60 * 60 * 1000;
  const cutoffTime = new Date().getTime() - fourHours;

  return db('people_choices')
    .where('dateChosen', '>', cutoffTime)
    .andWhere({ userId, lunchOptionId })
    .update({ isFetching: false });
};

export const findByPersonId = (userId) => {
  return db('people_choices').where({ userId }).limit(1).then((users) => users.length ? users[0] : false);
};

export const updateLunchOptionId = (userId, lunchOptionId) => {
  logger.info(`${userId} update choice to ${lunchOptionId}`);
  return findByPersonId(userId).then((personChoice) => {
    if (!personChoice) {
      logger.info(`${userId} has no existing choice`);
      return add(userId, lunchOptionId);
    }

    const personChoiceUpdate = { lunchOptionId, dateChosen: new Date().getTime() };
    return db('people_choices')
      .where({ userId, lunchOptionId: personChoice.lunchOptionId })
      .update(personChoiceUpdate)
      .then(() => ({ ...personChoice, ...personChoiceUpdate }));
  });
};

export const updateOrderDetails = (userId, orderDetails) => {
  logger.info(`${userId} update orderDetails to ${orderDetails}`);
  return findByPersonId(userId).then((personChoice) => {
    if (!personChoice) {
      return Promise.reject(new Error(`${userId} updated orderDetails without making a selection`));
    }

    return db('people_choices')
      .where({ userId, lunchOptionId: personChoice.lunchOptionId })
      .update({ orderDetails })
      .then(() => ({ ...personChoice, orderDetails }));
  });
};

export const updatePaymentAmount = (userId, paymentAmount) => {
  logger.info(`${userId} changed paymentAmount to ${paymentAmount}`);
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
  logger.info(`${userId} is getting lunch for option ${lunchOptionId}`);
  return Promise.all([
    db('people_choices')
      .whereNot({ userId })
      .andWhere({ lunchOptionId })
      .update({ isFetching: false }),
    db('people_choices')
      .where({ userId })
      .andWhere({ lunchOptionId })
      .update({ isFetching: true }),
  ]);
};

export const updateGoneToFetchLunch = (userId, lunchOptionId) => {
  logger.info(`${userId} has left to get lunch for option ${lunchOptionId}`);
  return Promise.resolve(true);
};
