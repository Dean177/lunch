import * as PersonRepo from '../repository/PersonRepo';
import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import Promise from 'promise';
import { changeImageUrl } from '../../shared/actionCreators/userActionCreator';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
const debug = require('debug')('lunch:actionHandler:onChangeImageUrl');

export default function onChangeImageUrl(io, socket, action) {
  const { payload: { url }, meta: { user } } = action;
  debug(`user: ${user.name} changed url to ${url}`);
  return Promise.all([
    PersonRepo.updateImageUrl(user, url),
    PersonChoiceRepo.updateImageUrl(user, url),
  ]).then(() => {
    socket.broadcast.emit(Action, changeImageUrl(user.id, url));
  });
}
