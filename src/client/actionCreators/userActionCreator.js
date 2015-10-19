import { ChangeName } from '../../shared/constants/actionTypes';

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
