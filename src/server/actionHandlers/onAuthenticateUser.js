import debug from 'debug';
import * as PersonRepo from '../repository/PersonRepo';
import getSplitwiseAuthApi from '../getSplitwiseAuthApi';
import {
  splitwiseAuthSuccess,
  splitwiseAuthToken,
  userAuthenticated,
} from '../../shared/actionCreators/authActionCreator';
import { Action } from '../../shared/constants/WeboscketMessageTypes';

const dBug = debug('lunch:actionHandlers:onAuthenticateUser');
const authApi = getSplitwiseAuthApi();

export default function onAuthenticateUser(io, socket, action) {
  const user = action.payload;
  dBug(`User authenticating: ${user.name}`);
  const { splitwiseAuth } = PersonRepo.findPerson(user);

  if (!splitwiseAuth) {
    dBug(`user: ${user.name} has no existing token`);
    authApi.getOAuthRequestToken()
      .then(onNewAuth(socket, user))
      .catch(onNewAuthErr(socket));
  } else {
    dBug(`user: ${user.name} has existing auth token`);
    const splitwiseApi = authApi.getSplitwiseApi(splitwiseAuth.token, splitwiseAuth.secret);
    splitwiseApi.getCurrentUser()
      .then(onExistingAuth(socket))
      .catch(onExistingAuthErr(socket, splitwiseAuth.token));
  }

  socket.emit(Action, userAuthenticated(true));
};

const onNewAuth = (emitter, user) => ({ token, secret }) => {
  dBug('Received new splitwise api token for user: ', { token });
  PersonRepo.updateSplitwiseAuth(user, token, secret);
  emitter.emit(Action, splitwiseAuthToken(false, authApi.getUserAuthorisationUrl(token)));
};

const onNewAuthErr = (emitter) => (err) => {
  dBug('User not authenticated or api is down', err);
  emitter.emit(Action, splitwiseAuthToken(false, ''));
};

const onExistingAuth = (emitter) => (splitwiseUserInfo) => {
  // TODO Add the splitwise user data to personRepo?
  dBug(`user: ${user.name} fetched splitwise details`);
  emitter.emit(Action, splitwiseAuthSuccess(splitwiseUserInfo));
  emitter.emit(Action, splitwiseAuthToken(true));
};

const onExistingAuthErr = (emitter, token) => (err) => {
  dBug('User has not authed token or api is down', err);
  emitter.emit(Action, splitwiseAuthToken(false, authApi.getUserAuthorisationUrl(token)));
};
