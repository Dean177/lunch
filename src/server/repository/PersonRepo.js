const debug = require('debug')('lunch:PersonRepo');
const db = require('./db');
import { find } from 'underscore';
import Promise from 'promise';

export const add = (person) => {
  debug(`Created new user ${person.name}`);
  return db('users')
    .insert({ id: person.id, name: person.name })
    .then(() => { return Promise.resolve(person); });
};

export const findPerson = (person) => {
  return db.select()
    .from('users')
    .where({ id: person.id })
    .then((users) => {
      debug('users', users);
      if (!users.length) {
        return add(person);
      } else {
        return users[0];
      }
    });
};

export const findById = (personId) => {
  return db.select()
    .from('users')
    .where({ id: personId })
    .then((users) => { return users[0] });
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
      imageUrl
    };
  });
};

export const updateName = (person, name) => {
  return findById(person.id).then((matchingUser) => {
    if (!matchingUser) {
      return add({ ...person, imageUrl });
    }
    return db('users').where({ id: person.id }).update({ name })
  }).then(() => {
    return {
      ...person,
      name
    };
  });
};

const findTokenByUserId = (userId) => {
  return db.select().from('splitwise_tokens').where({ userId }).then((tokens) => {});
};

export const getSplitwiseAuth = (userId) => {
  debug(`Fetching existing auth for: ${userId}`);
  return findTokenByUserId(userId).then((tokens) => {
    if (!tokens.length) {
      return Promise.reject(new Error(`No auth found for: ${userId}`));
    }

    return tokens[0];
  });
};

export const addSplitwiseToken = (userId, token, secret) => {
  return db('splitwise_tokens')
    .insert({ userId, token, secret, hasAuthorizedSplitwiseToken: false })
    .then(() => { return { token, secret } });
};

export const authorizeToken = (userId) => {
  return db('splitwise_tokens')
    .where({ user_id: person.id })
    .update({ hasAuthorizedSplitwiseToken: true })
};

export const updateSplitwiseAuth = (user, token, secret) => {
  debug(`Updating auth for user: ${user.id}`);
  return findTokenByUserId(user.id).then((tokens) => {
    if (!tokens.length) {
      debug(`No existing user with id ${user.id}`);
      return addSplitwiseToken(userId, token, secret);
    }

    return db('splitwise_tokens').where({ user_id: person.id })
      .update({ token, secret, hasAuthorizedSplitwiseToken: false })
      .then(() => { return { token, secret } });
  });
};
