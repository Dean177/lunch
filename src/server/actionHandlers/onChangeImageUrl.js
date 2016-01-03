import * as PersonRepo from '../repository/PersonRepo';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onChangeImageUrl');

import { sendCurrentState } from '../websocketHandler';

export default function onChangeImageUrl(io, socket, action) {
  const { payload: { url }, meta: { user } } = action;
  dBug(`user: ${user.name} changed url to ${url}`);
  return PersonRepo.updateImageUrl(user, url).then(() => {
    // TODO send the minimal state update
    sendCurrentState(io);
  });
}
