import debug from 'debug';
const dBug = debug('lunch:PersonChoiceRepo');
import { find } from 'underscore';

const peopleChoices = [];

export const getAll = (cutoffTime) => peopleChoices.filter(personChoice => personChoice.dateChosen.getTime() > cutoffTime);

export const add = (personChoice) => {
  dBug(`User: ${personChoice.person.name} has made initial choice ${personChoice.choiceId}`);
  peopleChoices.push(personChoice);
  return personChoice;
};

export const updateName = (user, name) => {
  const matchingUser = find(peopleChoices, (personChoice) => (personChoice.person.id === user.id));
  if (matchingUser) {
    matchingUser.person.name = name;
    return matchingUser;
  }
};

export const findByPersonId = (personId) => {
  return find(peopleChoices, (personChoice) => personChoice.person.id === personId);
};

export const updateChoiceId = (person, choiceId) => {
  dBug(`${person.name} update choice to ${choiceId}`);
  const personChoice = find(peopleChoices, (pChoice) => (pChoice.person.id === person.id));
  if (personChoice) {
    if (personChoice.choiceId != choiceId) {
      personChoice.choiceId = choiceId;
      personChoice.dateChosen = new Date();
      personChoice.isFetching = false;
    }

    return personChoice;
  } else {
    return add({ person, choiceId, dateChosen: new Date() });
  }
};

export const updateOrderDetails = (person, orderDetails) => {
  dBug(`${person.name} update orderDetails to ${orderDetails}`);
  const personChoice = find(peopleChoices, (pChoice) => (pChoice.person.id === person.id));
  if (!personChoice) {
    dBug(`${person.name} updated orderDetails without making a selection`);
  }
  personChoice.orderDetails = orderDetails;
  return personChoice;
};

export const updateWhoIsFetchingLunch = (userId, lunchOptionId) => {
  dBug(`${userId} is getting lunch for option ${lunchOptionId}`);
  peopleChoices
    .filter(personChoice => personChoice.choiceId === lunchOptionId)
    .forEach(personChoice => {
      personChoice.isFetching = personChoice.person.id === userId;
    });
};