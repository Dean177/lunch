import * as PersonRepo from '../repository/PersonRepo';
import { splitwiseAuthFailure, splitwiseAuthSuccess } from '../../shared/actionCreators/authActionCreator';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
import { getSplitwiseUserApi } from '../getSplitwiseAuthApi';
const logger = require('../../../logger-config');

export default function onSplitwiseAuth(io, socket, action) {
  const { meta: { user } } = action;
  logger.info(`user: ${user.name} attempted to confirm splitwise auth.`);
  return PersonRepo.findSplitwiseAuthByUserId(user.id)
    .then((splitwiseAuth) => {
      if (!splitwiseAuth) {
        return Promise.reject(new Error(`No auth found for: ${user.id}`));
      }
      return getSplitwiseUserApi(splitwiseAuth.token, splitwiseAuth.secret).getCurrentUser();
    })
    .then((splitwiseUser) => socket.emit(Action, splitwiseAuthSuccess(splitwiseUser)))
    .then(() => PersonRepo.authorizeToken(user.id))
    .catch((err) => {
      logger.error(err);
      socket.emit(Action, splitwiseAuthFailure(err.message || err.error));
    });
}
