import * as PersonRepo from '../repository/PersonRepo';
import { splitwiseAuthFailure, splitwiseAuthSuccess } from '../../shared/actionCreators/authActionCreator';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
import { getSplitwiseUserApi } from '../getSplitwiseAuthApi';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onSplitwiseAuth');

export default function onSplitwiseAuth(io, socket, action) {
  const { meta: { user } } = action;
  dBug(`user: ${user.name} attempted to confirm splitwise auth.`);
  const splitwiseAuth = PersonRepo.getSplitwiseAuth(user.id);

  if (!splitwiseAuth) {
    return socket.emit(Action, splitwiseAuthFailure('No access token found for user.'));
  }

  const splitwiseApi = getSplitwiseUserApi(splitwiseAuth.token, splitwiseAuth.secret);

  splitwiseApi.getCurrentUser().then((splitwiseUser) => {
    socket.emit(Action, splitwiseAuthSuccess(splitwiseUser));
  }).catch((err) => {
    socket.emit(Action, splitwiseAuthFailure(err.error));
  });
}
