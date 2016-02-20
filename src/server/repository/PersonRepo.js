const db = require('./db');
const logger = require('../logger')('PersonRepo');

export const add = (person) => {
  logger.info(`Created new user ${person.name}`);
  return db('users')
    .insert({ id: person.id, name: person.name })
    .then(() => person);
};

export const findById = (id) => db.select()
    .from('users')
    .where({ id })
    .then((persons) => persons.length ? persons[0] : false);

export const updateImageUrl = (person, imageUrl) => findById(person.id)
  .then((matchingUser) => {
    if (!matchingUser) {
      return add({ ...person, imageUrl });
    }
    return db('users').where({ id: person.id }).update({ imageUrl });
  }).then(() => ({ ...person, imageUrl }));

export const updateName = (person, name) => findById(person.id)
  .then((matchingUser) => {
    if (!matchingUser) {
      return add({ ...person, name });
    }
    return db('users').where({ id: person.id }).update({ name });
  }).then(() => ({
    ...person,
    name,
  }));

export const findSplitwiseAuthByUserId = (userId) => db
    .select()
    .from('splitwise_tokens')
    .where({ userId })
    .then((tokens) => tokens.length ? tokens[0] : false);

export const addSplitwiseToken = (userId, token, secret) => db('splitwise_tokens')
    .insert({ userId, token, secret, hasAuthorizedSplitwiseToken: false })
    .then(() => ({ token, secret }));

export const authorizeToken = (userId) => db('splitwise_tokens')
    .where({ userId })
    .update({ hasAuthorizedSplitwiseToken: true });

export const updateSplitwiseAuth = (userId, token, secret) => {
  logger.info(`Updating auth for user: ${userId}`);
  return findSplitwiseAuthByUserId(userId).then((userToken) => {
    if (!userToken) {
      logger.info(`No existing user with id ${userId}`);
      return addSplitwiseToken(userId, token, secret);
    }

    return db('splitwise_tokens')
      .where({ userId })
      .update({ token, secret, hasAuthorizedSplitwiseToken: false })
      .then(() => ({ token, secret }));
  });
};
