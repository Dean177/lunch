/// <reference path="../../../typings/tsd.d.ts" />
import * as uuid from 'node-uuid';
import {
  AddLunchOption,
  EnterLunchOptionName,
  UserLunchChoice,
  ToggleEnterNewLunchOption
} from '../../shared/constants/actionTypes';

export function addLunchOption(person: Person, name: string): Action {
  return {
    type: AddLunchOption,
    payload: {
      id: uuid.v4(),
      person,
      name,
    },
    meta: { isServerAction: true },
  };
}

export function chooseLunchOption(person: Person, choiceId: string): Action {
  return {
    type: UserLunchChoice,
    payload: {
      person,
      choiceId,
    },
    meta: { isServerAction: true },
  };
}

export function enterOptionName(name: string): Action {
  return { type: EnterLunchOptionName, payload: { name }, meta: {} };
}

export function toggleNewOption(): Action {
  return { type: ToggleEnterNewLunchOption, payload: {}, meta: {} };
}
