import * as PersonRepo from '../repository/PersonRepo';
import { splitwiseAuthFailure, splitwiseAuthSuccess } from '../../shared/actionCreators/authActionCreator';
import AuthApi from 'splitwise-node';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onSplitwiseAuth');

export default function onOfferToGetLunch(io, socket, action) {
  const { meta: { user } } = action;
  dBug(`user: ${user.name} attempted to confirm splitwise auth.`);

  const splitwiseAuth = PersonRepo.getSplitwiseAuth(user.id);

  if (!splitwiseAuth) {
    socket.emit('action', splitwiseAuthFailure('No access token found for user.'));
  }

  const SplitwiseConsumerSecret = process.env.SPLITWISE_CONSUMER_SECRET;
  const SplitwiseConsumerKey = process.env.SPLITWISE_CONSUMER_KEY;
  const authApi = new AuthApi(SplitwiseConsumerKey, SplitwiseConsumerSecret);
  dBug(`Attempting to auth user`)
  const splitwiseApi = authApi.getSplitwiseApi(splitwiseAuth.token, splitwiseAuth.secret);

  splitwiseApi.getCurrentUser()
    .then(
      (user) => { socket.emit('action', splitwiseAuthSuccess(user));},
      (err) => { socket.emit('action', splitwiseAuthFailure(err)); }
    );
}
