import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onOfferToGetLunch');

import { sendCurrentState } from '../websocketHandler';


export default function onOfferToGetLunch(io, socket, action) {
  const { payload: { lunchOptionId }, meta: { user } } = action;
  dBug(`user: ${user.name} offered to get lunch for ${lunchOptionId}`);

  return PersonChoiceRepo.updateWhoIsFetchingLunch(user.id, lunchOptionId).then(() => {
    // TODO broadcast the change
    sendCurrentState(io);
  });
}
