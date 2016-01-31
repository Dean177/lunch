import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import * as LunchOptionRepo from '../repository/LunchOptionRepo';
const debug = require('debug')('lunch:actionHandler:onUserLunchChoice');

import { sendCurrentState } from '../websocketHandler';

export default function onUserLunchChoice(io, socket, action) {
  const { payload: { choiceId }, meta: { user } } = action;
  debug(`${user.name} made choice: ${choiceId}`);
  return Promise.all([
    LunchOptionRepo.updateLastChosen(choiceId),
    PersonChoiceRepo.updateChoiceId(user.id, choiceId),
  ]).then(() => {
    // TODO update clients
    sendCurrentState(io);
  });
}
