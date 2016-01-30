const debug = require('debug')('lunch:PersonRepo');
const db = require('./db');
import { find } from 'underscore';
import Promise from 'promise';

const people = [];

export const add = (person) => {
  debug(`Created new user ${person.name}`);
  people.push(person);
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
    return db('users').where({ id: person.id }).update({ imageUrl })
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

export const updateSplitwiseAuth = (user, token, secret) => {
  debug(`Updated auth for user: ${user.id}`);
  return findById(user.id).then(matchingUser => {
    if (!matchingUser) {
      return debug(`No existing user with id ${user.id}`);
    }

    matchingUser.splitwiseAuth = { token, secret };
    return Promise.resolve({ token, secret });
  });
};

export const getSplitwiseAuth = (personId) => {
  debug(`Fetching existing auth for: ${personId}`);
  return findById(personId).then((matchingUser) => {
    if (!matchingUser || matchingUser.splitwiseAuth == null) {
      return Promise.reject(new Error(`No auth found for: ${personId}`));
    }

    const { token, secret } = matchingUser.splitwiseAuth;
    if (!token || !secret) {
      return Promise.reject(new Error(`Corrupt auth stored for: ${personId}`));
    }

    return Promise.resolve({ token, secret });
  });
};
