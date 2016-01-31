import * as PersonRepo from '../repository/PersonRepo';
import { changeImageUrl } from '../../shared/actionCreators/userActionCreator';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
const debug = require('debug')('lunch:actionHandler:onChangeImageUrl');

export default function onChangeImageUrl(io, socket, action) {
  const { payload: { url }, meta: { user } } = action;
  debug(`user: ${user.name} changed url to ${url}`);
  return PersonRepo.updateImageUrl(user, url).then(() => {
    socket.broadcast.emit(Action, changeImageUrl(user.id, url));
  });

  // TODO catch error and notify the client their name update failed?
}
