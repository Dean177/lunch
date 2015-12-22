import { OptionChoices } from '../../shared/constants/actionTypes';
import * as LunchOptionRepo from '../repository/LunchOptionRepo';
import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';

export default function getOptionChoicesMessage() {
  const fourHours = 4 * 60 * 60 * 1000;
  const cutoffTime = new Date().getTime() - fourHours;
  return {
    type: OptionChoices,
    payload: {
      lunchOptions: LunchOptionRepo.getAll(cutoffTime),
      peopleChoices: PersonChoiceRepo.getAll(cutoffTime),
    },
  };
}
