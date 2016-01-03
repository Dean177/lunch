import debug from 'debug';
const dBug = debug('lunch:actionHandlers:onAddLunchOption');
import * as LunchOptionRepo from '../repository/LunchOptionRepo';
import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import { addLunchOption } from '../../shared/actionCreators/lunchActionCreators';
import { Action } from '../../shared/constants/WeboscketMessageTypes';

export function onAddLunchOption(LunchOptionRepo, PersonChoiceRepo) {
  return (io, socket, action) => {
    const { payload: { name }, meta: { user } } = action;
    dBug(`LunchOption: ${name} added by ${user.name}`);

    return LunchOptionRepo
      .findByName(name)
      .then((existingOption) => {
        dBug('is existing option?', !!existingOption);
        if (!existingOption) {
          return LunchOptionRepo.add(name);
        }
        return existingOption;
      }).then((lunchOption) => {
        dBug('new lunchOption', lunchOption);
        return PersonChoiceRepo.updateChoiceId(user, lunchOption.id).then(() => {
          dBug('Sending changes', lunchOption);
          // We must remove the meta.isServerAction or the clients will just send the action back due to the serverActionMiddleware!
          const newLunchOptionAction = { ...addLunchOption(user, lunchOption.name, lunchOption.id), meta: {} };
          socket.broadcast.emit(Action, newLunchOptionAction);
        });
      });
  }
}

const withDeps = onAddLunchOption(LunchOptionRepo, PersonChoiceRepo);
export default withDeps;
