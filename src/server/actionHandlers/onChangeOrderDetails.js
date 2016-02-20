import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
import updatedPersonChoice from '../actionCreators/updatedPersonChoice';
const logger = require('../logger')('onChangeOrderDetails');

export default function onChangeOrderDetails(io, socket, action) {
  const { payload: { orderDetails }, meta: { user } } = action;
  logger.info(`user: ${user.name} changed orderDetails to ${orderDetails}`);
  return PersonChoiceRepo.updateOrderDetails(user.id, orderDetails).then((personChoice) => {
    socket.broadcast.emit(Action, updatedPersonChoice(personChoice));
  }).catch((err) => {
    logger.error(err);
  });
}
