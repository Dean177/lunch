import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onUserLunchChoice');

export default function onUserLunchChoice(io, socket, action) {
  const { payload: { choiceId }, meta: { user } } = action;
  dBug(`${user.name} made choice: ${choiceId}`);
  if (PersonChoiceRepo.findByPersonId(user.id)) {
    PersonChoiceRepo.update(user.id, choiceId);
  } else {
    PersonChoiceRepo.add({ person: user, dateChosen: new Date(), choiceId });
  }
}
