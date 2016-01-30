const debug = require('debug')('lunch:actionHandlers:onAddLunchOption');
import * as LunchOptionRepo from '../repository/LunchOptionRepo';
import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import { addLunchOption } from '../../shared/actionCreators/lunchActionCreators';
import { Action } from '../../shared/constants/WeboscketMessageTypes';

export function onAddLunchOption(lunchOptionRepo, personChoiceRepo) {
  return (io, socket, action) => {
    const { payload: { name }, meta: { user } } = action;
    debug(`LunchOption: ${name} added by ${user.name}`);

    const addedLunchOption = lunchOptionRepo.add(name);
    const updatedLunchChoice = addedLunchOption.then((lunchOption) => {
      debug(`User `, lunchOption);
      return personChoiceRepo.updateChoiceId(user, lunchOption.id);
    });

    return Promise
      .all([addedLunchOption, updatedLunchChoice])
      .then(([lunchOption, personChoice]) => {
        debug(`Updated personChoice for ${user.name} to choiceId:${personChoice.lunchOptionId}`);
        // We must remove the meta.isServerAction or the clients will just send the action back
        // due to the serverActionMiddleware!
        const newLunchOptionAction = { ...addLunchOption(user, lunchOption.name, lunchOption.id), meta: {} };
        socket.broadcast.emit(Action, newLunchOptionAction);
      });
  };
}

const withDeps = onAddLunchOption(LunchOptionRepo, PersonChoiceRepo);
export default withDeps;
