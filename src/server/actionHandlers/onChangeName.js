import * as PersonRepo from '../repository/PersonRepo';
import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import Promise from 'promise';
import { changeName } from '../../shared/actionCreators/userActionCreator';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
const debug = require('debug')('lunch:actionHandler:onChangeName');

export default function onChangeName(io, socket, action) {
  const { payload: { name }, meta: { user } } = action;
  debug(`user: ${user.name} changed name to ${name}`);
  return PersonRepo.updateName(user, name).then(() => {
    socket.broadcast.emit(Action, changeName(user.id, name));
  });

  // TODO catch error and notify the client their name update failed?
}
