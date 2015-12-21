import { find } from 'underscore';

const people = [];

export const add = (person) => {
  people.push(person);
  return person;
};

export const findById = (personId) => find(people, (person) => (person.id === personId));

export const getAll = () => people;

export const updateImageUrl = (user, imageUrl) => {
  const matchingUser = find(people, (person) => (person.id === user.id));
  if (matchingUser) {
    user.imageUrl = imageUrl;
    return user;
  } else {
    return add({ ...user, imageUrl });
  }
};

export const updateName = (user, name) => {
  const matchingUser = find(people, (person) => (person.id === user.id));
  if (matchingUser) {
    user.name = name;
    return user;
  } else {
    return add({ ...user, name });
  }
};
