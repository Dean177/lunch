import io from 'socket.io-client';
import { serverPort } from '../../shared/constants/config';

export const socket = io.connect(`http://${window.location.hostname}:${serverPort}`);

export default function send(action) {
  socket.emit('action', action);
}
