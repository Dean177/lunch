import * as PersonRepo from '../repository/PersonRepo';
import { splitwiseAuthFailure, splitwiseAuthSuccess } from '../../shared/actionCreators/authActionCreator';
import AuthApi from 'splitwise-node';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onSplitwiseAuth');

export default function onOfferToGetLunch(io, socket, action) {
  const { meta: { user } } = action;
  dBug(`user: ${user.name} attempted to confirm splitwise auth.`);

  const splitwiseAuth = PersonRepo.getAccessToken(user.id);

  if (!splitwiseAuth) {
    socket.emit('action', splitwiseAuthFailure('No access token found for user.'));
  }

  // TODO create a token for the user if they dont have one (in websocket index
  const authApi = new AuthApi();
  const splitwiseApi = authApi.getSplitwiseApi(splitwiseAuth.token, splitwiseAuth.secret);

  splitwiseApi.getCurrentUser()
    .then(
      (user) => { socket.emit('action', splitwiseAuthSuccess(user));},
      (err) => { socket.emit('action', splitwiseAuthFailure(err)); }
    );
}
