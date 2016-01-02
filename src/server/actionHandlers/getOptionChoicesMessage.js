import Promise from 'promise';
import { OptionChoices } from '../../shared/constants/actionTypes/lunchActionTypes';
import * as LunchOptionRepo from '../repository/LunchOptionRepo';
import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';

export default function getOptionChoicesMessage() {
  const fourHours = 4 * 60 * 60 * 1000;
  const cutoffTime = new Date().getTime() - fourHours;
  return Promise
    .all([LunchOptionRepo.getAll(cutoffTime), PersonChoiceRepo.getAll(cutoffTime)])
    .then(([lunchOptions, peopleChoices]) => {
      return Promise.resolve({
        type: OptionChoices,
        payload: {
          lunchOptions,
          peopleChoices,
        },
      });
    });
}
