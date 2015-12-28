import debug from 'debug';
const dBug = debug('lunch:PersonChoiceRepo');
import { find } from 'underscore';

const peopleChoices = [];

export const getAll = (cutoffTime) => peopleChoices.filter(personChoice => (
  personChoice.dateChosen && personChoice.dateChosen > cutoffTime)
);

export const add = (personChoice) => {
  dBug(`User: ${personChoice.person.name} has made initial choice ${personChoice.choiceId}`);
  peopleChoices.push(personChoice);
  return personChoice;
};

export const updateName = (user, name) => {
  const matchingUser = find(peopleChoices, (personChoice) => (personChoice.person.id === user.id));
  if (!matchingUser) {
    dBug(`Attempted to update the name of a user which doesn't exist ${user}`);
  }

  matchingUser.person.name = name;
  return matchingUser;
};

export const findByPersonId = (personId) => {
  return find(peopleChoices, (personChoice) => personChoice.person.id === personId);
};

export const updateChoiceId = (person, choiceId) => {
  dBug(`${person.name} update choice to ${choiceId}`);
  const personChoice = find(peopleChoices, (pChoice) => (pChoice.person.id === person.id));
  if (!personChoice) {
    return add({ person, choiceId, dateChosen: new Date().getTime(), paymentAmount: '' });
  }

  personChoice.dateChosen = new Date().getTime();
  if (personChoice.choiceId !== choiceId) {
    personChoice.choiceId = choiceId;
    personChoice.isFetching = false;
  }

  return personChoice;
};

export const updateOrderDetails = (person, orderDetails) => {
  dBug(`${person.name} update orderDetails to ${orderDetails}`);
  const personChoice = findByPersonId(person.id);
  if (!personChoice) {
    dBug(`${person.name} updated orderDetails without making a selection`);
  }

  personChoice.orderDetails = orderDetails;
  return personChoice;
};

export const updatePaymentAmount = (person, amount) => {
  dBug(`${person.name} changed paymentAmount to ${amount}`);
  const personChoice = findByPersonId(person.id);
  if (!personChoice) {
    dBug(`${person.name} updated payment amount without making a selection`);
  }

  personChoice.paymentAmount = amount;
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
