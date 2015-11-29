import * as _ from 'underscore';
import upsert from '../../shared/util/upsert';
import { OptionChoices } from '../../shared/constants/actionTypes';

interface ChangeImageUrlAction extends Action {
  payload: {
    id: string;
    url: string;
    name: string;
  }
}

export default function onChangeImageUrl(io, action: ChangeImageUrlAction, peopleChoices: PersonChoice[], lunchOptions: LunchOption[]) {
  const { payload } = action;
  const personChoice: PersonChoice = _.find(peopleChoices, (pChoice) => (pChoice.person.id === payload.id));

  const newPersonChoice: PersonChoice = {
    choiceId: personChoice.choiceId,
    person: {
      id: payload.id,
      imageUrl: payload.url,
      name: payload.name
    },
  };

  peopleChoices = upsert(
    peopleChoices,
    (pChoice) => (pChoice.person.id === payload.id),
    newPersonChoice
  );

  io.emit('message', {type: OptionChoices, payload: {peopleChoices, lunchOptions}});
}