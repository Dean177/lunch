import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
import { Action } from '../../shared/constants/WeboscketMessageTypes';

export default function onGoneToFetchLunch(io, socket, action) {
  const { payload: { lunchOptionId }, meta: { user } } = action;
  // Save who has gone to fetch the food?
  PersonChoiceRepo.updateGoneToFetchLunch(user.id, lunchOptionId).then(() => {
    const actionToEmit = { ...action, meta: {} };
    socket.broadcast.emit(Action, actionToEmit);
  });
}
