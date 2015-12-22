import * as PersonRepo from '../repository/PersonRepo';
import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onChangeName');

export default function onChangeName(io, socket, action) {
  const { payload: { name }, meta: { user } } = action;
  dBug(`user: ${user.name} changed name to ${name}`);
  PersonRepo.updateName(user, name);
  PersonChoiceRepo.updateName(user, name);
  // TODO broadcast the change
}