import io from 'socket.io-client';
import { serverPort } from '../../shared/constants/config';
import { Action } from '../../shared/constants/WeboscketMessageTypes';

export const socket = io.connect(`http://${window.location.hostname}:${serverPort}`);

export default function send(action) {
  socket.emit(Action, action);
}
