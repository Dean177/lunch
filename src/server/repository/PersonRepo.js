const db = require('./db');
const logger = require('../../../logger-config');

export const add = (person) => {
  logger.info(`Created new user ${person.name}`);
  return db('users')
    .insert({ id: person.id, name: person.name })
    .then(() => person);
};

export const findById = (id) => {
  return db.select()
    .from('users')
    .where({ id })
    .then((persons) => { return persons.length ? persons[0] : false; });
};

export const updateImageUrl = (person, imageUrl) => {
  return findById(person.id).then((matchingUser) => {
    if (!matchingUser) {
      return add({ ...person, imageUrl });
    }
    return db('users').where({ id: person.id }).update({ imageUrl });
  }).then(() => {
    return {
      ...person,
      imageUrl,
    };
  });
};

export const updateName = (person, name) => {
  return findById(person.id).then((matchingUser) => {
    if (!matchingUser) {
      return add({ ...person, name });
    }
    return db('users').where({ id: person.id }).update({ name });
  }).then(() => {
    return {
      ...person,
      name,
    };
  });
};

export const findSplitwiseAuthByUserId = (userId) => {
  return db
    .select()
    .from('splitwise_tokens')
    .where({ userId })
    .then((tokens) => tokens.length ? tokens[0] : false);
};

export const addSplitwiseToken = (userId, token, secret) => {
  return db('splitwise_tokens')
    .insert({ userId, token, secret, hasAuthorizedSplitwiseToken: false })
    .then(() => {
      return { token, secret };
    });
};

export const authorizeToken = (userId) => {
  return db('splitwise_tokens')
    .where({ userId })
    .update({ hasAuthorizedSplitwiseToken: true });
};

export const updateSplitwiseAuth = (userId, token, secret) => {
  logger.info(`Updating auth for user: ${userId}`);
  return findSplitwiseAuthByUserId(userId).then((userToken) => {
    if (!userToken) {
      logger.info(`No existing user with id ${userId}`);
      return addSplitwiseToken(userId, token, secret);
    }

    return db('splitwise_tokens').where({ userId })
      .update({ token, secret, hasAuthorizedSplitwiseToken: false })
      .then(() => { return { token, secret }; });
  });
};
