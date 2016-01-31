import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import debug from 'debug';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
const dBug = debug('lunch:actionHandler:onOfferToGetLunch');


export default function onNotGettingLunch(io, socket, action) {
  const { payload: { lunchOptionId }, meta: { user } } = action;
  dBug(`user: ${user.name} is no longer getting lunch for ${lunchOptionId}`);

  return PersonChoiceRepo.clearFetchers(user.id, lunchOptionId).then(() => {
    socket.broadcast.emit(Action, { ...action, meta: { user } });
  });
}
