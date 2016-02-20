const logger = require('../logger')('onAuthenticateUser');
import * as PersonRepo from '../repository/PersonRepo';
import getSplitwiseAuthApi from '../getSplitwiseAuthApi';
import {
  splitwiseAuthSuccess,
  splitwiseAuthToken,
  userAuthenticated,
} from '../../shared/actionCreators/authActionCreator';
import { Action } from '../../shared/constants/WeboscketMessageTypes';

const authApi = getSplitwiseAuthApi();

const onNewAuth = (socket, user) => ({ token, secret }) => {
  logger.info('Received new splitwise api token for user: ', { token });
  return PersonRepo.updateSplitwiseAuth(user.id, token, secret).then((updatedAuth) => {
    socket.emit(
      Action,
      splitwiseAuthToken(false, authApi.getUserAuthorisationUrl(updatedAuth.token), user.id)
    );
  });
};

const onNewAuthErr = (emitter) => (err) => {
  logger.error('User not authenticated or api is down', err);
  emitter.emit(Action, splitwiseAuthToken(false, ''));
};

const onExistingAuth = (emitter, user) => (splitwiseUserInfo) => {
  logger.info(`user: ${user.name} fetched splitwise details`);
  emitter.emit(Action, splitwiseAuthSuccess(splitwiseUserInfo));
  emitter.emit(Action, splitwiseAuthToken(true));
};

const onExistingAuthErr = (emitter, token) => (err) => {
  logger.warn('User has not authed token or api is down', err);
  emitter.emit(Action, splitwiseAuthToken(false, authApi.getUserAuthorisationUrl(token)));
};

export default function onAuthenticateUser(io, socket, action) {
  const user = action.payload;
  logger.info(`User authenticating: ${user.name}`);
  return PersonRepo
    .findById(user.id)
    .then((person) => person || PersonRepo.add(user))
    .then((existingUser) => PersonRepo.findSplitwiseAuthByUserId(existingUser.id))
    .then((splitwiseAuth) => {
      if (!splitwiseAuth) {
        logger.info(`user: ${user.name} has no existing token`);
        authApi.getOAuthRequestToken()
          .then(onNewAuth(socket, user))
          .catch(onNewAuthErr(socket));
      } else {
        logger.info(`user: ${user.name} has existing auth token`);
        const splitwiseApi = authApi.getSplitwiseApi(splitwiseAuth.token, splitwiseAuth.secret);
        splitwiseApi.getCurrentUser()
          .then(onExistingAuth(socket, user))
          .catch(onExistingAuthErr(socket, splitwiseAuth.token));
      }
    }).then(() => {
      socket.emit(Action, userAuthenticated(true));
    }).catch((err) => {
      logger.error(err);
    });
}
