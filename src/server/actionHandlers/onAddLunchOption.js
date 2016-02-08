import { addLunchOption } from '../../shared/actionCreators/lunchActionCreators';
import { Action } from '../../shared/constants/WeboscketMessageTypes';
const logger = require('../../../logger-config');

export default function onAddLunchOption(lunchOptionRepo, personChoiceRepo) {
  return (io, socket, action) => {
    const { payload: { name }, meta: { user } } = action;
    logger.info(`LunchOption added by ${user.name}: ${name}`);

    const addedLunchOption = lunchOptionRepo.add(name);
    const updatedLunchChoice = addedLunchOption.then((lunchOption) => {
      logger.info(`User `, lunchOption);
      return personChoiceRepo.updateLunchOptionId(user.id, lunchOption.id);
    });

    return Promise
      .all([addedLunchOption, updatedLunchChoice])
      .then(([lunchOption, personChoice]) => {
        logger.info(`Updated personChoice for ${user.name} to lunchOptionId:${personChoice.lunchOptionId}`);
        // We must remove the meta.isServerAction or the clients will just send the action back
        // due to the serverActionMiddleware!
        const newLunchOptionAction = { ...addLunchOption(user, lunchOption.name, lunchOption.id), meta: {} };
        socket.broadcast.emit(Action, newLunchOptionAction);
      })
      .catch((err) => {
        logger.error(err);
      });
  };
}
