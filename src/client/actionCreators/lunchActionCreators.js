import { v4 as uuid } from 'node-uuid';
import { AddLunchOption, ChooseLunchOption, EnterLunchOptionName, ToggleEnterNewLunchOption } from '../../shared/constants/actionTypes';

export function addLunchOption(name) {
  return {
    type: AddLunchOption,
    payload: {
      id: uuid(),
      name,
    },
    meta: { isServerAction: true },
  };
}

export function chooseLunchOption(user, choiceId) {
  return {
    type: ChooseLunchOption,
    payload: { id: choiceId },
    meta: { isServerAction: true },
  };
}

export function enterOptionName(name) {
  return { type: EnterLunchOptionName, payload: { name } };
}

export function toggleNewOption() {
  return { type: ToggleEnterNewLunchOption, payload: {} };
}
