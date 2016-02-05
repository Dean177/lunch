import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
const logger = require('../../../logger-config');

export default function onOfferToGetLunch(io, socket, action) {
  const { payload: { lunchOptionId }, meta: { user } } = action;
  logger.info(`user: ${user.name} offered to get lunch for ${lunchOptionId}`);

  return PersonChoiceRepo.updateWhoIsFetchingLunch(user.id, lunchOptionId).then(() => {
    socket.broadcast.emit(Action, action);
  }).catch(logger.error);
}
