import Promise from 'promise';
const db = require('./db');
const logger = require('../../../logger-config');

export const add = (person) => {
  logger.info(`Created new user ${person.name}`);
  return db('users')
    .insert({ id: person.id, name: person.name })
    .then(() => { return Promise.resolve(person); });
};

export const findById = (personId) => {
  return db.select()
    .from('users')
    .where({ id: personId })
    .then((users) => { return users.length ? users[0] : false; });
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
    .then((tokens) => {
      logger.info(`Tokens found for ${userId}`, tokens);
      return tokens.length ? tokens[0] : false;
    });
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

export const updateSplitwiseAuth = (user, token, secret) => {
  logger.info(`Updating auth for user: ${user.id}`);
  return findSplitwiseAuthByUserId(user.id).then((userToken) => {
    if (!userToken) {
      logger.info(`No existing user with id ${user.id}`);
      return addSplitwiseToken(user.id, token, secret);
    }

    return db('splitwise_tokens').where({ userId: user.id })
      .update({ token, secret, hasAuthorizedSplitwiseToken: false })
      .then(() => { return { token, secret }; });
  });
};
