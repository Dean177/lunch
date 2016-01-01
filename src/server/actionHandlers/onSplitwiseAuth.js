import * as PersonRepo from '../repository/PersonRepo';
import { splitwiseAuthFailure, splitwiseAuthSuccess } from '../../shared/actionCreators/authActionCreator';
import AuthApi from 'splitwise-node';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onSplitwiseAuth');

export default function onSplitwiseAuth(io, socket, action) {
  const { meta: { user } } = action;
  dBug(`user: ${user.name} attempted to confirm splitwise auth.`);

  const splitwiseAuth = PersonRepo.getSplitwiseAuth(user.id);

  if (!splitwiseAuth) {
    socket.emit('action', splitwiseAuthFailure('No access token found for user.'));
  }

  const SplitwiseConsumerKey = process.env.SPLITWISE_CONSUMER_KEY;
  const SplitwiseConsumerSecret = process.env.SPLITWISE_CONSUMER_SECRET;
  const splitwiseApi = new AuthApi(SplitwiseConsumerKey, SplitwiseConsumerSecret).getSplitwiseApi(splitwiseAuth.token, splitwiseAuth.secret);

  splitwiseApi.getCurrentUser().then((user) => {
    socket.emit('action', splitwiseAuthSuccess(user));
  }).catch((err) => {
    socket.emit('action', splitwiseAuthFailure(err.error)); }
  );
}
