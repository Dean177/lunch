import { ChangeName, ChangeImageUrl } from '../constants/actionTypes/userActionTypes';

export function changeName(id, name) {
  return {
    type: ChangeName,
    payload: {
      id,
      name,
    },
    meta: { isServerAction: true },
  };
}

export function changeImageUrl(id, url) {
  return {
    type: ChangeImageUrl,
    payload: {
      id,
      url,
    },
    meta: { isServerAction: true },
  };
}
