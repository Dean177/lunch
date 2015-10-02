import { AddLunchOption, ChooseLunchOption, EnterLunchOptionName, ToggleEnterNewLunchOption } from '../../shared/constants/actionTypes';
import { socket } from '../App';

//TODO create a decorator to pass an event over the socket
export function addLunchOption(name) {
  const action = {
    type: AddLunchOption,
    name,
  };

  socket.emit(AddLunchOption, action);

  return action;
}

export function chooseLunchOption(id) {
  const action = {
    type: ChooseLunchOption,
    id,
  };

  socket.emit(ChooseLunchOption, action);

  return action;
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
