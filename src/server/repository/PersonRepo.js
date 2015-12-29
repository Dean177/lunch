import debug from 'debug';
import { find } from 'underscore';
const dBug = debug('lunch:PersonRepo');

const people = [];

export const add = (person) => {
  people.push(person);
  return person;
};

export const findById = (personId) => find(people, (person) => (person.id === personId));

export const getAll = () => people;

export const updateImageUrl = (user, imageUrl) => {
  const matchingUser = findById(user.id);
  if (!matchingUser) {
    return add({ ...user, imageUrl });
  }

  user.imageUrl = imageUrl;
  return user;
};

export const updateName = (user, name) => {
  const matchingUser = findById(user.id);
  if (!matchingUser) {
    return add({ ...user, name });
  }

  user.name = name;
  return user;
};

export const updateSplitwiseAuth = (userId, splitwiseAuth) => {
  dBug(`Update auth for user: ${userId}`, splitwiseAuth);
  const matchingUser = findById(userId);
  if (!matchingUser) {
    // TODO error
  }

  matchingUser.splitwiseAuth = { ...matchingUser.splitwiseAuth,  ...splitwiseAuth };

  return matchingUser.splitwiseAuth;
};

export const getSplitwiseAuth = (userId) => {
  const matchingUser = findById(userId);
  if (!matchingUser) {
    return false;
  }

  return matchingUser.splitwiseAuth;
};
