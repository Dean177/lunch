import { find } from 'underscore';

const people = [];

export const add = (person) => {
  people.push(person);
};

export const findById = (personId) => find(people, (person) => (person.id === personId));

export const getAll = () => people;

export const update = () => { };

export const updateImageUrl = (personId, imageUrl) => {
  const user = find(people, (person) => (person.id === personId));
  user.imageUrl = imageUrl;
};

export const updateName = (personId, name) => {
  const user = find(people, (person) => (person.id === personId));
  if (user) {
    user.name = name;
  } else {
    add({ id: personId, name, imageUrl: '' });
  }
};
