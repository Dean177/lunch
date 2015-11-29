import * as _ from 'underscore';
import upsert from '../../shared/util/upsert';
import { OptionChoices } from '../../shared/constants/actionTypes';

interface AddLunchOptionAction extends Action {
  payload: LunchOption;
  meta: {
    user: Person;
  }
}

export default function onAddLunchOption(socket, action: AddLunchOptionAction, peopleChoices: PersonChoice[], lunchOptions: LunchOption[]) {
  const { payload, meta: { user } } = action;
  const existingOption: LunchOption = _.find(lunchOptions, (l: LunchOption) => l.name === payload.name);

  if (existingOption) {
    const newPersonChoice: PersonChoice = {
      choiceId: existingOption.id,
      person: user,
    };

    peopleChoices = upsert(
      peopleChoices,
      (personChoice) => (personChoice.person.id === user.id),
      newPersonChoice
    );
  } else {
    lunchOptions.push(payload);
    const newPersonChoice: PersonChoice = {
      choiceId: payload.id,
      person: user,
    };
    peopleChoices = upsert(
      peopleChoices,
      (personChoice) => (personChoice.person.id === user.id),
      newPersonChoice
    );
  }

  socket.broadcast.send({type: OptionChoices, payload: {lunchOptions, peopleChoices}});
}
