import { v4 as uuid } from 'node-uuid';
import {
  AddLunchOption,
  ChangeOrderDetails,
  EnterLunchOptionName,
  UpdatePaymentAmount,
  GoneToFetchLunch,
  NotGettingLunch,
  OfferToGetLunch,
  ToggleEnterNewLunchOption,
  UserLunchChoice,
} from '../constants/actionTypes/lunchActionTypes';

export function addLunchOption(person, name, id) {
  return {
    type: AddLunchOption,
    payload: {
      id: id || uuid(),
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

export function chooseLunchOption(person, lunchOptionId) {
  return {
    type: UserLunchChoice,
    payload: { person, lunchOptionId },
    meta: { isServerAction: true },
  };
}

export function enterOptionName(name) {
  return { type: EnterLunchOptionName, payload: { name } };
}

export function updatePaymentAmount(user, amount) {
  return {
    type: UpdatePaymentAmount,
    payload: { amount, user },
    meta: { isServerAction: true },
  };
}

export function goneToFetchLunch(lunchOptionId) {
  return {
    type: GoneToFetchLunch,
    payload: { lunchOptionId },
    meta: { isServerAction: true },
  };
}

export function notGettingLunch(lunchOptionId) {
  return {
    type: NotGettingLunch,
    payload: { lunchOptionId },
    meta: { isServerAction: true },
  };
}

export function offerToGetLunch(user, lunchOptionId) {
  return {
    type: OfferToGetLunch,
    payload: { user, lunchOptionId },
    meta: { isServerAction: true },
  };
}

export function toggleNewOption() {
  return { type: ToggleEnterNewLunchOption, payload: {} };
}
