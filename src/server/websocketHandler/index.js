import debug from 'debug';
import { v4 as uuid } from 'node-uuid';
import getOptionChoicesMessage from '../actionHandlers/getOptionChoicesMessage';
import getActionHandler from './getActionHandler';
import actionHandlers from '../actionHandlers';
import AuthApi from 'splitwise-node';
import { getSplitwiseAuth, updateSplitwiseAuth } from '../repository/PersonRepo';

const dBug = debug('lunch:socket-io');
const actionHandler = getActionHandler(actionHandlers);


export default function configureWebsocket(io) {
  const SplitwiseConsumerSecret = process.env.SPLITWISE_CONSUMER_SECRET;
  const SplitwiseConsumerKey = process.env.SPLITWISE_CONSUMER_KEY;
  const authApi = new AuthApi(SplitwiseConsumerKey, SplitwiseConsumerSecret);

  dBug('Splitwise keys', SplitwiseConsumerSecret, SplitwiseConsumerKey);
  const connections = {};

  function updateClients() {
    io.emit('action', getOptionChoicesMessage());
  }
  setInterval(updateClients, 60 * 1000);

  const serverActionHandler = actionHandler(io);

  io.on('connection', (socket) => {
    const socketActionHandler = serverActionHandler(socket);
    const socketId = uuid();
    connections[socketId] =  { socket };

    socket.on('error', dBug);
    socket.on('close', () => { delete connections[socketId]; });
    socket.on('authenticate', ({ user }) => {
      dBug(`auth payload received from user: ${user}`);
      socket.emit('test', 'two');

      const onNewAuth = ({ oAuthToken, oAuthTokenSecret }) => {
        dBug('newAuthSuccess', { token: oAuthToken, secret: oAuthTokenSecret });
        const authObject = {
          token: oAuthToken,
          splitwiseAuthorizationLink: authApi.getUserAuthorisationUrl(oAuthToken),
          hasAuthorizedSplitwiseToken: false
        };

        socket.emit('authenticated', authObject);
        //updateSplitwiseAuth(user.id, authObject);
      };

      const onNewAuthErr = (err) => {
        dBug('newAuthFailed', err);
        // TODO handle the case where the splitwise api is down
        socket.emit('authenticated', {
          token: '',
          splitwiseAuthorizationLink: authApi.getUserAuthorisationUrl(splitwiseAuth.token),
          hasAuthorizedSplitwiseToken: false
        });
      };

      const splitwiseAuth = getSplitwiseAuth(user.id);
      if (!splitwiseAuth) {
        dBug(`fetching new authpair for user: ${user.name}`);
        authApi.getOAuthRequestToken().then(onNewAuth, onNewAuthErr).then(() => { socket.emit('test', 'three'); });
      } else {
        dBug(`user: ${user.name} has existing auth token: ${splitwiseAuth}`);
        const splitwiseApi = authApi.getSplitwiseApi(splitwiseAuth.token, splitwiseAuth.secret);
        splitwiseApi.getCurrentUser().then(
          (splitwiseUserInfo) => {
            // TODO Add the current user data to personRepo
            dBug(`user: ${user.name} splitwise details: ${splitwiseUserInfo}`);
            socket.emit('authenticated', {
              token: splitwiseAuth.token,
              splitwiseAuthorizationLink: authApi.getUserAuthorisationUrl(splitwiseAuth.token),
              hasAuthorizedSplitwiseToken: false
            })
          },
          (err) => {
            dBug('User not authenticated or api is down', err);
            // TODO User has not authed the token / the api is down. How to distinguish?
            socket.emit('authenticated', {
              token: '',
              splitwiseAuthorizationLink: authApi.getUserAuthorisationUrl(splitwiseAuth.token),
              hasAuthorizedSplitwiseToken: false
            });
          }
        );
      }

      // Send current state to the client
      socket.emit('action', getOptionChoicesMessage());
    });

    socket.on('action', (action) => {
      socketActionHandler(action);
      updateClients(io);
    });
  });

  return io;
}
