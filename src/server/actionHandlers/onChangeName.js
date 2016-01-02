import * as PersonRepo from '../repository/PersonRepo';
import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import debug from 'debug';
import Promise from 'promise';
const dBug = debug('lunch:actionHandler:onChangeName');

import { sendCurrentState } from '../websocketHandler';

export default function onChangeName(io, socket, action) {
  const { payload: { name }, meta: { user } } = action;
  dBug(`user: ${user.name} changed name to ${name}`);
  return Promise.all([
    PersonRepo.updateName(user, name),
    PersonChoiceRepo.updateName(user, name),
  ]).then(() => {
    // TODO broadcast the change
    sendCurrentState(io);
  });
}
