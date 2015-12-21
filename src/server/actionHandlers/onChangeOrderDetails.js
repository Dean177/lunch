import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onChangeOrderDetails');

export default function onChangeOrderDetails(io, socket, action) {
  const { payload: { orderDetails }, meta: { user } } = action;
  dBug(`user: ${user.name} changed orderDetails to ${orderDetails}`);
  PersonChoiceRepo.updateOrderDetails(user, orderDetails);
}
