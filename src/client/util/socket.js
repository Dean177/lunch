import io from 'socket.io-client';
import { Action } from '../../shared/constants/WeboscketMessageTypes';

const serverPort = __PORT__ || 3333;
console.log('SERVER PORT', serverPort);

export const socket = io.connect(`http://${window.location.hostname}:${serverPort}`);
export default function send(action) {
  socket.emit(Action, action);
}
