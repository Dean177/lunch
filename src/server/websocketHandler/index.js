import debug from 'debug';
import { v4 as uuid } from 'node-uuid';
import getSplitwiseAuthApi from '../getSplitwiseAuthApi';
import getOptionChoicesMessage from '../actionHandlers/getOptionChoicesMessage';
import getActionHandler from './getActionHandler';
import actionHandlers from '../actionHandlers';
import { Action, Authenticate, Authenticated } from '../../shared/constants/WeboscketMessageTypes';
import { getSplitwiseAuth, updateSplitwiseAuth } from '../repository/PersonRepo';
import { splitwiseAuthSuccess } from '../../shared/actionCreators/authActionCreator';


const dBug = debug('lunch:socket-io');
const actionHandler = getActionHandler(actionHandlers);


export default function configureWebsocket(io) {
  const authApi = getSplitwiseAuthApi();
  const connections = {};

  function updateClients() {
    io.emit(Action, getOptionChoicesMessage());
  }
  setInterval(updateClients, 60 * 1000);

  const serverActionHandler = actionHandler(io);

  io.on('connection', (socket) => {
    const socketActionHandler = serverActionHandler(socket);
    const socketId = uuid();
    connections[socketId] = { socket };

    socket.on('error', dBug);
    socket.on('close', () => { delete connections[socketId]; });
    socket.on(Authenticate, ({ user }) => {
      dBug('User authenticating:', user);
      // TODO Find the current user, create them if they dont exist, remove the duplicated user creation code from 'updateSplitwiseAuth'

      const onNewAuth = ({ oAuthToken, oAuthTokenSecret }) => {
        dBug('Received new splitwise api token for user: ', { token: oAuthToken });
        const authObject = {
          token: oAuthToken,
          splitwiseAuthorizationLink: authApi.getUserAuthorisationUrl(oAuthToken),
          hasAuthorizedSplitwiseToken: false,
        };

        socket.emit('authenticated', authObject);
        updateSplitwiseAuth(user, { ...authObject, secret: oAuthTokenSecret });
      };

      const onAuthErr = (err) => {
        dBug('User not authenticated or api is down', err);
        socket.emit(Authenticated, {
          token: '',
          splitwiseAuthorizationLink: '',
          hasAuthorizedSplitwiseToken: false,
        });
      };

      const splitwiseAuth = getSplitwiseAuth(user.id);
      if (!splitwiseAuth) {
        authApi.getOAuthRequestToken()
          .then(onNewAuth)
          .catch(onAuthErr);
      } else {
        dBug(`user: ${user.name} has existing auth token:`);
        const splitwiseApi = authApi.getSplitwiseApi(splitwiseAuth.token, splitwiseAuth.secret);
        splitwiseApi.getCurrentUser().then((splitwiseUserInfo) => {
          // TODO Add the splitwise user data to personRepo?
          dBug(`user: ${user.name} fetched splitwise details`);
          socket.emit(Action, splitwiseAuthSuccess(splitwiseUserInfo));
          socket.emit('authenticated', {
            token: splitwiseAuth.token,
            splitwiseAuthorizationLink: authApi.getUserAuthorisationUrl(splitwiseAuth.token),
            hasAuthorizedSplitwiseToken: true,
          });
        }).catch(onAuthErr);
      }

      // Send current state to the client
      socket.emit(Action, getOptionChoicesMessage());
    });

    socket.on(Action, (action) => {
      socketActionHandler(action);
      updateClients();
    });
  });

  return io;
}
