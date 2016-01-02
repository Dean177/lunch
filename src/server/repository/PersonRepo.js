import debug from 'debug';
import { find } from 'underscore';
const dBug = debug('lunch:PersonRepo');

const people = [];

export const add = (person) => {
  dBug(`Created new user`, person);
  people.push(person);
  return person;
};

export const findPerson = (person) => {
  const existingPerson = find(people, (pers) => (person.id === pers.id || person.name === pers.name));
  if (!existingPerson) {
    return add(person);
  }

  return existingPerson;
};

export const findById = (personId) => find(people, (person) => (person.id === personId));

export const getAll = () => people;

export const updateImageUrl = (person, imageUrl) => {
  const matchingUser = findById(person.id);
  if (!matchingUser) {
    return add({ ...person, imageUrl });
  }

  person.imageUrl = imageUrl;
  return person;
};

export const updateName = (person, name) => {
  const matchingUser = findById(person.id);
  if (!matchingUser) {
    return add({ ...person, name });
  }

  person.name = name;
  return person;
};

export const updateSplitwiseAuth = (user, token, secret) => {
  dBug(`Updated auth for user: ${user.id}`);
  let matchingUser = findById(user.id);
  if (!matchingUser) {
    return dBug(`No existing user with id ${user.id}`);
  }

  return matchingUser.splitwiseAuth = { token, secret };
};

export const getSplitwiseAuth = (personId) => {
  dBug(`Fetching existing auth for: ${personId}`);
  const matchingUser = findById(personId);
  if (!matchingUser || matchingUser.splitwiseAuth == null) {
    dBug(`No auth found for: ${personId}`);
    return false;
  }

  const { token, secret } = matchingUser.splitwiseAuth;
  if (!token || !secret) {
    dBug(`Corrupt auth stored for: ${personId}`);
    return false;
  }

  return { token, secret };
};
