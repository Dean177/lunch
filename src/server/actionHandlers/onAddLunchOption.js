import debug from 'debug';
const dBug = debug('lunch:actionHandlers:onAddLunchOption');

import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import * as LunchOptionRepo from '../repository/LunchOptionRepo';

export default function onAddLunchOption(io, socket, action) {
  const { payload: { name }, meta: { user } } = action;
  dBug(`LunchOption: ${name} added by ${user.name}`);

  return LunchOptionRepo.findByName(name)
    .then((existingOption) => {
      if (existingOption) {
        return PersonChoiceRepo.updateChoiceId(user, existingOption.id);
      }

      return LunchOptionRepo.add(name).then(newLunchOption => {
        return PersonChoiceRepo.updateChoiceId(user, newLunchOption.id);
      });
    });
}
