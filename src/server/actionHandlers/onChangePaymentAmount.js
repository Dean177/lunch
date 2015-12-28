import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onChangePaymentAmount');

export default function onChangePaymentAmount(io, socket, action) {
  const { payload: { amount }, meta: { user } } = action;
  dBug(`user: ${user.name} changed paymentAmount to ${amount}`);
  PersonChoiceRepo.updatePaymentAmount(user, amount);
}
