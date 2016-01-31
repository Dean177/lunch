import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
const dBug = require('debug')('lunch:actionHandler:onChangePaymentAmount');
import { Action } from '../../shared/constants/WeboscketMessageTypes';

export default function onChangePaymentAmount(io, socket, action) {
  const { payload: { amount }, meta: { user } } = action;
  dBug(`user: ${user.name} changed paymentAmount to ${amount}`);
  return PersonChoiceRepo.updatePaymentAmount(user.id, amount).then(() => {
    socket.broadcast.emit(Action, action);
  }).catch(dBug);
}
