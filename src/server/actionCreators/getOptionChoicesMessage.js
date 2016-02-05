import Promise from 'promise';
import { OptionChoices } from '../../shared/constants/actionTypes/lunchActionTypes';
import * as LunchOptionRepo from '../repository/LunchOptionRepo';
import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';
const logger = require('../../../logger-config');

export default function getOptionChoicesMessage() {
  const fourHours = 4 * 60 * 60 * 1000;
  const cutoffTime = new Date().getTime() - fourHours;
  logger.info(`Getting option choices with cutoff ${cutoffTime}`);
  return Promise
    .all([LunchOptionRepo.getAll(cutoffTime), PersonChoiceRepo.getAll(cutoffTime)])
    .then(([lunchOptions, peopleChoices]) => {
      return {
        type: OptionChoices,
        payload: {
          lunchOptions,
          peopleChoices,
        },
      };
    });
}
