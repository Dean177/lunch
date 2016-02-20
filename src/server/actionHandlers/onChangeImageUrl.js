import * as PersonRepo from '../repository/PersonRepo';
import { changeImageUrl } from '../../shared/actionCreators/userActionCreator';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
const logger = require('../logger')('onChangeImageUrl');

export default function onChangeImageUrl(io, socket, action) {
  const { payload: { url }, meta: { user } } = action;
  logger.info(`user: ${user.name} changed url to ${url}`);
  return PersonRepo.updateImageUrl(user, url).then(() => {
    socket.broadcast.emit(Action, changeImageUrl(user.id, url));
  }).catch((err) => {
    // TODO notify the client their name update failed?
    logger.error(err);
  });
}
