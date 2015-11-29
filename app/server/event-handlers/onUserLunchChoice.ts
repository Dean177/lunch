import * as _ from 'underscore';
import upsert from '../../shared/util/upsert';
import { OptionChoices } from '../../shared/constants/actionTypes';

interface UserLunchChoiceAction extends Action {
  payload: PersonChoice;
}

export default function onUserLunchChoice(socket, action, peopleChoices, lunchOptions) {
  const { payload: { person, choiceId }} = action;
  //const chosenOption: LunchOption = _.find(lunchOptions, (lOpt: LunchOption) => (lOpt.id === choiceId));

  peopleChoices = upsert(peopleChoices, (personChoice) => (personChoice.person.id === person.id), { person, choiceId });
  //lunchOptions = upsert(
  //  lunchOptions,
  //  (lunchOption) => (lunchOption.id === choiceId),
  //  assign({}, chosenOption, { lastChosen: new Date() })
  //);

  socket.broadcast.send({
    type: OptionChoices,
    payload: { peopleChoices, lunchOptions },
  });
}
