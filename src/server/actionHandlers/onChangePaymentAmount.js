import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
const logger = require('../../../logger-config');


export default function onChangePaymentAmount(io, socket, action) {
  const { payload: { amount }, meta: { user } } = action;
  logger.info(`user: ${user.name} changed paymentAmount to ${amount}`);
  return PersonChoiceRepo.updatePaymentAmount(user.id, amount).then(() => {
    socket.broadcast.emit(Action, action);
  }).catch((err) => {
    logger.error(err);
  });
}
