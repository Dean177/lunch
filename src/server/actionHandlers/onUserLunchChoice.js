import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import * as LunchOptionRepo from '../repository/LunchOptionRepo';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
import { chooseLunchOption } from '../../shared/actionCreators/lunchActionCreators';
const logger = require('../../../logger-config');

export default function onUserLunchChoice(io, socket, action) {
  const { payload: { lunchOptionId }, meta: { user } } = action;
  logger.info(`${user.name} made choice: ${lunchOptionId}`);
  return Promise.all([
    PersonChoiceRepo.updateLunchOptionId(user.id, lunchOptionId),
    LunchOptionRepo.updateLastChosen(lunchOptionId),
  ]).then(([personChoice, choiceId]) => {
    socket.broadcast.emit(Action, chooseLunchOption(user, choiceId));
  }).catch((err) => {
    logger.error(err);
  });
}
