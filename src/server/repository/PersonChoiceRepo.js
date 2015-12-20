import debug from 'debug';
const dBug = debug('lunch:PersonChoiceRepo');
import { find } from 'underscore';

const peopleChoices = [];

export const getAll = (cutoffTime) => peopleChoices.filter(personChoice => personChoice.dateChosen.getTime() > cutoffTime);

export const add = (personChoice) => {
  dBug(`User: ${personChoice.person.name} has made initial choice ${personChoice.choiceId}`);
  peopleChoices.push(personChoice);
};

export const findByPersonId = (personId) => {
  return find(peopleChoices, (personChoice) => personChoice.person.id === personId);
};

export const update = (personId, choiceId) => {
  dBug(`${personId} update choice to ${choiceId}`);
  const personChoice = find(peopleChoices, (pChoice) => (pChoice.person.id === personId));
  personChoice.choiceId = choiceId;
  personChoice.dateChosen = new Date();
  dBug(peopleChoices);
};
