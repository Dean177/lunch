import * as PersonRepo from '../repository/PersonRepo';
import debug from 'debug';
const dBug = debug('lunch:actionHandler:onChangeImageUrl');

export default function onChangeImageUrl(io, socket, action) {
  const { payload: { imageUrl }, meta: { user } } = action;
  dBug(`user: ${user.name} changed url to ${imageUrl}`);
  if (PersonRepo.findById(user.id)) {
    PersonRepo.updateImageUrl(user.id, imageUrl);
  } else {
    PersonRepo.add({ ...user, imageUrl });
  }
}
