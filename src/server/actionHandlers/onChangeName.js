import * as PersonRepo from '../repository/PersonRepo';
import { changeName } from '../../shared/actionCreators/userActionCreator';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
const logger = require('../logger')('onChangeName');

export default function onChangeName(io, socket, action) {
  const { payload: { name }, meta: { user } } = action;
  logger.info(`user: ${user.name} changed name to ${name}`);
  return PersonRepo.updateName(user, name).then(() => {
    socket.broadcast.emit(Action, changeName(user.id, name));
  }).catch((err) => {
    logger.error(err);
    // TODO notify the client their name update failed?
  });
}
