import * as PersonRepo from '../repository/PersonRepo';
import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onChangeName');

export default function onOfferToGetLunch(io, socket, action) {
  const { payload: { lunchOptionId }, meta: { user } } = action;
  dBug(`user: ${user.name} offered to get lunch for ${lunchOptionId}`);

  PersonChoiceRepo.updateWhoIsFetchingLunch(user.id, lunchOptionId);
  // TODO broadcast the change
}
