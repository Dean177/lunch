import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import * as LunchOptionRepo from '../repository/LunchOptionRepo';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onUserLunchChoice');

export default function onUserLunchChoice(io, socket, action) {
  const { payload: { choiceId }, meta: { user } } = action;
  dBug(`${user.name} made choice: ${choiceId}`);
  return Promise.all([
    PersonChoiceRepo.findByPersonId(user.id),
    LunchOptionRepo.updateLastChosen(choiceId),
  ]).then(([personChoice]) => {
    if (!personChoice) {
      return PersonChoiceRepo.add({ person: user, dateChosen: new Date().getTime(), choiceId });
    }
    return PersonChoiceRepo.updateChoiceId(user, choiceId);
  }).then(() => {
    // TODO update clients
  });
}
