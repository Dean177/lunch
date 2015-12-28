import * as PersonRepo from '../repository/PersonRepo';
import { splitwiseAuthFailure, splitwiseAuthSuccess } from '../../shared/actionCreators/authActionCreator'
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onSplitwiseAuth');

export default function onOfferToGetLunch(io, socket, action) {
  const { meta: { user } } = action;
  dBug(`user: ${user.name} attempted to confirm splitwise auth.`);

  //PersonRepo
  socket.emit('action', splitwiseAuthFailure('Failed for raisin.'));
  // TODO broadcast the change
}
