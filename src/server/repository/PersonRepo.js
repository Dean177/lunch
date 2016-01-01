import debug from 'debug';
import { find } from 'underscore';
const dBug = debug('lunch:PersonRepo');

const people = [];

export const add = (person) => {
  dBug(`Created new user`, person);
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

export const updateSplitwiseAuth = (user, splitwiseAuth) => {
  let matchingUser = findById(user.id);
  if (!matchingUser) {
    dBug(`No existing user with id ${user.id}`);
    matchingUser = add({
      ...user,
      splitwiseAuth,
    });
  } else if (matchingUser.splitwiseAuth == null) {
    matchingUser.splitwiseAuth = splitwiseAuth;
  } else {
    matchingUser.splitwiseAuth = { ...matchingUser.splitwiseAuth, ...splitwiseAuth };
  }

  const updatedAuth = matchingUser.splitwiseAuth;
  dBug(`Updated auth for user: ${user.id}`, updatedAuth);

  return updatedAuth;
};

export const getSplitwiseAuth = (userId) => {
  dBug(`Fetching existing auth for user: ${userId}`);
  const matchingUser = findById(userId);
  if (!matchingUser || matchingUser.splitwiseAuth == null) {
    dBug(`No auth found for : ${userId}`);
    return false;
  }

  const { token, secret } = matchingUser.splitwiseAuth;
  if (!token || !secret || token == null || secret == null) {
    dBug(`Corrupt auth stored for: ${userId}`);
    return false;
  }

  return { token, secret };
};
