import * as PersonRepo from '../repository/PersonRepo';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onChangeName');

export default function onChangeName(io, socket, action) {
  const { payload: { name }, meta: { user } } = action;
  dBug(`user: ${user.name} changed name to ${name}`);
  if (PersonRepo.findById(user.id)) {
    PersonRepo.updateName(user.id, name);
  } else {
    PersonRepo.add({ ...user, name });
  }
}
