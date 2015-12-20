import { OptionChoices } from '../../shared/constants/actionTypes';
import * as LunchOptionRepo from '../repository/LunchOptionRepo';
import * as PersonChoiceRepo from '../repository/PersonChoiceRepo';

export default function getOptionChoicesMessage() {
  const cutoffTime = (new Date()).getTime() - 4 * 60 * 60 * 1000;
  const lunchOptions = LunchOptionRepo.getAll(cutoffTime);
  const peopleChoices = PersonChoiceRepo.getAll(cutoffTime);
  return {
    type: OptionChoices,
    payload: {
      lunchOptions,
      peopleChoices,
    },
  };
}
