const dBug = require('debug')('lunch:PersonChoiceRepo');
import Promise from 'promise';

let peopleChoices = [];

export const getAll = (cutoffTime) => {

  const peepChoices = peopleChoices.filter(personChoice => (
    personChoice.dateChosen && personChoice.dateChosen > cutoffTime)
  );

  return Promise.resolve(peepChoices || []);
};

export const add = (personChoice) => {
  dBug(`User: ${personChoice.person.name} has made initial choice ${personChoice.choiceId}`);
  peopleChoices.push(personChoice);
  return Promise.resolve(personChoice);
};

export const clearFetchers = (lunchOptionId) => {
  dBug(`No one is offering to get option ${lunchOptionId}`);
  return Promise.resolve(
    peopleChoices
      .filter(personChoice => personChoice.choiceId === lunchOptionId && personChoice.isFetching)
      .forEach(personChoice => personChoice.isFetching = false)
  );
};

export const updateImageUrl = (user, url) => {
  const matchingUser = find(peopleChoices, (personChoice) => (personChoice.person.id === user.id));
  if (!matchingUser) {
    const message = `Attempted to update the name of a user which doesn't exist ${user}`;
    dBug(message);
    return Promise.reject(new Error(message));
  }

  matchingUser.person.imageUrl = url;
  return Promise.resolve(matchingUser);
};

export const updateName = (user, name) => {
  const matchingUser = find(peopleChoices, (personChoice) => (personChoice.person.id === user.id));
  if (!matchingUser) {
    const message = `Attempted to update the name of a user which doesn't exist ${user}`;
    dBug(message);
    return Promise.reject(new Error(message));
  }

  matchingUser.person.name = name;
  return Promise.resolve(matchingUser);
};

export const findByPersonId = (personId) => {
  return Promise.resolve(find(peopleChoices, (personChoice) => personChoice.person.id === personId));
};

export const updateChoiceId = (person, choiceId) => {
  dBug(`${person.name} update choice to ${choiceId}`);
  const personChoice = find(peopleChoices, (pChoice) => (pChoice.person.id === person.id));
  if (!personChoice) {
    return Promise.resolve(add({ person, choiceId, dateChosen: new Date().getTime(), orderDetails: '', paymentAmount: '' }));
  }

  personChoice.dateChosen = new Date().getTime();
  if (personChoice.choiceId !== choiceId) {
    personChoice.choiceId = choiceId;
    personChoice.isFetching = false;
  }

  return Promise.resolve(personChoice);
};

export const updateOrderDetails = (person, orderDetails) => {
  dBug(`${person.name} update orderDetails to ${orderDetails}`);
  return findByPersonId(person.id).then((personChoice) => {
    if (!personChoice) {
      const message = `${person.name} updated orderDetails without making a selection`;
      dBug(message);
      return Promise.reject(new Error(message));
    }

    personChoice.orderDetails = orderDetails;
    return Promise.resolve(personChoice);
  });
};

export const updatePaymentAmount = (person, amount) => {
  dBug(`${person.name} changed paymentAmount to ${amount}`);
  return findByPersonId(person.id).then((personChoice) => {
    if (!personChoice) {
      const message = `${person.name} updated payment amount without making a selection`;
      dBug(message);
      Promise.reject(new Error(message));
    }

    personChoice.paymentAmount = amount;
    return Promise.resolve(personChoice);
  });
};

export const updateWhoIsFetchingLunch = (userId, lunchOptionId) => {
  dBug(`${userId} is getting lunch for option ${lunchOptionId}`);
  return Promise.resolve(
    peopleChoices
      .filter(personChoice => personChoice.choiceId === lunchOptionId)
      .forEach(personChoice => {
        personChoice.isFetching = personChoice.person.id === userId;
      })
  );
};

export const updateGoneToFetchLunch = (userId, lunchOptionId) => {
  dBug(`${userId} has left to get lunch for option ${lunchOptionId}`);
  peopleChoices = peopleChoices.filter(personChoice => personChoice.choiceId !== lunchOptionId);
  return Promise.resolve(peopleChoices);
};
