import { v4 as uuid } from 'node-uuid';
import {
  AddLunchOption,
  ChangeOrderDetails,
  EnterLunchOptionName,
  GoneToFetchLunch,
  OfferToGetLunch,
  ToggleEnterNewLunchOption,
  UserLunchChoice
} from '../../shared/constants/actionTypes';

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

export function changeOrderDetails(orderDetails) {
  return {
    type: ChangeOrderDetails,
    payload: { orderDetails },
    meta: { isServerAction: true },
  };
}

export function chooseLunchOption(person, choiceId) {
  return {
    type: UserLunchChoice,
    payload: { person, choiceId },
    meta: { isServerAction: true },
  };
}

export function enterOptionName(name) {
  return { type: EnterLunchOptionName, payload: { name } };
}

export function goneToFetchLunch(lunchOptionId) {
  return {
    type: GoneToFetchLunch,
    payload: { lunchOptionId },
    meta: { isServerAction: true },
  };
}

export function offerToGetLunch(lunchOptionId) {
  return {
    type: OfferToGetLunch,
    payload: { lunchOptionId },
    meta: { isServerAction: true },
  };
}

export function toggleNewOption() {
  return { type: ToggleEnterNewLunchOption, payload: {} };
}
