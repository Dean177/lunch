import debug from 'debug';
import Promise from 'promise';
import { find } from 'underscore';
const dBug = debug('lunch:PersonRepo');

const people = [];

export const add = (person) => {
  dBug(`Created new user ${person.name}`);
  people.push(person);
  return Promise.resolve(person);
};

export const findPerson = (person) => {
  const existingPerson = find(people, (pers) => (person.id === pers.id || person.name === pers.name));
  if (!existingPerson) {
    return add(person);
  }

  return Promise.resolve(existingPerson);
};

export const findById = (personId) => {
  return Promise.resolve(find(people, (person) => (person.id === personId)));
};

export const getAll = () => Promise.resolve(people);

export const updateImageUrl = (person, imageUrl) => {
  const matchingUser = findById(person.id);
  if (!matchingUser) {
    return add({ ...person, imageUrl });
  }

  person.imageUrl = imageUrl;
  return Promise.resolve(person);
};

export const updateName = (person, name) => {
  const matchingUser = findById(person.id);
  if (!matchingUser) {
    return add({ ...person, name });
  }

  person.name = name;
  return Promise.resolve(person);
};

export const updateSplitwiseAuth = (user, token, secret) => {
  dBug(`Updated auth for user: ${user.id}`);
  return findById(user.id).then(matchingUser => {
    if (!matchingUser) {
      return dBug(`No existing user with id ${user.id}`);
    }

    matchingUser.splitwiseAuth = { token, secret };
    return Promise.resolve({ token, secret });
  });
};

export const getSplitwiseAuth = (personId) => {
  dBug(`Fetching existing auth for: ${personId}`);
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
