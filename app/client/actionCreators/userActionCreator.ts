/// <reference path="../../../typings/tsd.d.ts" />
import {ChangeName, ChangeImageUrl} from '../../shared/constants/actionTypes';

export function changeName(id: string, name: string): Action {
  return {
    type: ChangeName,
    payload: {
      id,
      name,
    },
    meta: { isServerAction: true },
  };
}

export function changeImageUrl(id: string, url: string): Action {
  return {
    type: ChangeImageUrl,
    payload: {
      id,
      url,
    },
    meta: { isServerAction: true },
  };
}
