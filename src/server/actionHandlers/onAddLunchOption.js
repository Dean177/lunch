import debug from 'debug';
const dBug = debug('lunch:actionHandlers:onAddLunchOption');

import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import * as LunchOptionRepo from '../repository/LunchOptionRepo';

export default function onAddLunchOption(io, socket, action) {
  const { payload: { name }, meta: { user } } = action;
  dBug(`LunchOption: ${name} added by ${user.name}`);

  const existingOption = LunchOptionRepo.findByName(name);
  if (existingOption) {
    PersonChoiceRepo.updateChoiceId(user, existingOption.id);
  } else {
    const newLunchOption = LunchOptionRepo.add(name);
    PersonChoiceRepo.updateChoiceId(user, newLunchOption.id);
  }
}
