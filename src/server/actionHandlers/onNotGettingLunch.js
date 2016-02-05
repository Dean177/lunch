import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
const logger = require('../../../logger-config');

export default function onNotGettingLunch(io, socket, action) {
  const { payload: { lunchOptionId }, meta: { user } } = action;
  logger.info(`user: ${user.name} is no longer getting lunch for ${lunchOptionId}`);

  return PersonChoiceRepo.clearFetchers(user.id, lunchOptionId).then(() => {
    socket.broadcast.emit(Action, { ...action, meta: { user } });
  }).catch(logger.error);
}
