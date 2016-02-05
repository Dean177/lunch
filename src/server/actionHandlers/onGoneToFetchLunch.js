import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
const logger = require('../../../logger-config');

export default function onGoneToFetchLunch(io, socket, action) {
  const { payload: { lunchOptionId }, meta: { user } } = action;
  // Save who has gone to fetch the food?
  PersonChoiceRepo.updateGoneToFetchLunch(user.id, lunchOptionId).then(() => {
    const actionToEmit = {
      ...action,
      meta: {
        user,
        navigateTo: '/gone',
      },
    };
    io.emit(Action, actionToEmit);
  }).catch((err) => {
    logger.error(err);
  });
}
