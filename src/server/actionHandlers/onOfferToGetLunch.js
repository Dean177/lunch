const dBug = require('debug')('lunch:actionHandler:onOfferToGetLunch');
import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import { Action } from '../../shared/constants/WeboscketMessageTypes';

export default function onOfferToGetLunch(io, socket, action) {
  const { payload: { lunchOptionId }, meta: { user } } = action;
  dBug(`user: ${user.name} offered to get lunch for ${lunchOptionId}`);

  return PersonChoiceRepo.updateWhoIsFetchingLunch(user.id, lunchOptionId).then(() => {
    socket.broadcast.emit(Action, action);
  });
}
