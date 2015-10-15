import { v4 as uuid } from 'node-uuid';
import { AddLunchOption, UserLunchChoice, EnterLunchOptionName, ToggleEnterNewLunchOption } from '../../shared/constants/actionTypes';

export function addLunchOption(person, name) {
  return {
    type: AddLunchOption,
    payload: {
      id: uuid(),
      person,
      name,
    },
    meta: { isServerAction: true },
  };
}

export function chooseLunchOption(person, choiceId) {
  return {
    type: UserLunchChoice,
    payload: {
      person,
      choiceId
    },
    meta: { isServerAction: true },
  };
}

export function enterOptionName(name) {
  return { type: EnterLunchOptionName, payload: { name } };
}

export function toggleNewOption() {
  return { type: ToggleEnterNewLunchOption, payload: {} };
}
