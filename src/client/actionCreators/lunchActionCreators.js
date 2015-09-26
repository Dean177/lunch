import { AddLunchOption, ChooseLunchOption, EnterLunchOptionName, ToggleEnterNewLunchOption } from '../../shared/constants/actionTypes';
import { socket } from '../App';

export function addLunchOption(name) {
  const action = {
    type: AddLunchOption,
    name,
  };

  socket.emit(AddLunchOption, action);

  return action;
}

export function chooseLunchOption(name) {
  return {
    type: ChooseLunchOption,
    name,
  };
}

export function enterOptionName(name) {
  return {
    type: EnterLunchOptionName,
    name,
  };
}

export function toggleNewOption() {
  return {
    type: ToggleEnterNewLunchOption,
  };
}
