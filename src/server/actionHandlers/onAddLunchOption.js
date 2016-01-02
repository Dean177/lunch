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
        if (!existingOption) {
          return LunchOptionRepo.add(name);
        }
        return existingOption;
      }).then((lunchOption) => {
        return PersonChoiceRepo.updateChoiceId(user, lunchOption.id).then(() => {
          io.broadcast.emit(Action, addLunchOption(user, lunchOption.name, lunchOption.id))
        });
      });
  }
}

const withDeps = onAddLunchOption(LunchOptionRepo, PersonChoiceRepo);
export default withDeps;
