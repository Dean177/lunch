import io from 'socket.io-client';
import { Action } from '../../shared/constants/WeboscketMessageTypes';

const serverPort = __DEVELOPMENT__ ? __PORT__ || 3333 : 80;
console.log('SERVER PORT', serverPort);

export const socket = io.connect(`http://${window.location.hostname}:${serverPort}`);
export default function send(action) {
  socket.emit(Action, action);
}
