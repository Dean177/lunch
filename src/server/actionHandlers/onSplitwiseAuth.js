import * as PersonRepo from '../repository/PersonRepo';
import { splitwiseAuthFailure, splitwiseAuthSuccess } from '../../shared/actionCreators/authActionCreator';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
import { getSplitwiseUserApi } from '../getSplitwiseAuthApi';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onSplitwiseAuth');

export default function onSplitwiseAuth(io, socket, action) {
  const { meta: { user } } = action;
  dBug(`user: ${user.name} attempted to confirm splitwise auth.`);
  return PersonRepo.getSplitwiseAuth(user.id).then(({ token, secret }) => {
    return getSplitwiseUserApi(token, secret).getCurrentUser();
  }).then((splitwiseUser) => {
    socket.emit(Action, splitwiseAuthSuccess(splitwiseUser));
  }).catch(err => {
    dBug(err);
    // TODO, make splitwise-node return proper Error objects
    socket.emit(Action, splitwiseAuthFailure(err.message || err.error));
  });
}
