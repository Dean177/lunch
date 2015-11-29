import * as _ from 'underscore';
import upsert from '../../shared/util/upsert';
import { OptionChoices } from '../../shared/constants/actionTypes';

interface ChangeNameAction extends Action {
  payload: {
    id: string;
    name: string;
  }
}

export default function onChangeName(io, action: ChangeNameAction, peopleChoices, lunchOptions) {
  const id = action.payload.id;
  const name = action.payload.name;
  const personChoice: PersonChoice = _.find(peopleChoices, (pChoice: PersonChoice) => (pChoice.person.id === id));
  const newPersonChoice: PersonChoice = {
    person: {
      id,
      name,
      imageUrl: personChoice.person.imageUrl
    },
    choiceId: personChoice.choiceId
  };

  peopleChoices = upsert(peopleChoices, (pChoice) => (pChoice.person.id === id), newPersonChoice);
  io.emit('message', {type: OptionChoices, payload: {peopleChoices, lunchOptions}});
}
