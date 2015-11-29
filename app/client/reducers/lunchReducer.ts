import createStateMergeReducer from '../util/createStateMergeReducer';
import * as _ from 'underscore';
import upsert from '../../shared/util/upsert';
import {
  AddLunchOption,
  EnterLunchOptionName,
  OptionChoices,
  ToggleEnterNewLunchOption,
  UserLunchChoice,
} from '../../shared/constants/actionTypes';


const initialState: LunchState = {
  optionName: '',
  enteringNewOption: false,
  lunchOptions: [],
  peopleChoices: [],
};

interface LunchState {
  optionName: string,
  enteringNewOption: boolean,
  lunchOptions: LunchOption[],
  peopleChoices: PersonChoice[],
}


const lunchReducer = createStateMergeReducer(initialState, {
  [OptionChoices](state, { payload: { peopleChoices, lunchOptions } }) {
    return { lunchOptions, peopleChoices };
  },

  [UserLunchChoice]({ peopleChoices }, { payload: { person, choiceId } } ) {
    const newPeopleChoices = upsert(
      peopleChoices,
      (personChoice) => (personChoice.person.id === person.id),
      { person, choiceId }
    );

    return { peopleChoices: newPeopleChoices };
  },

  [AddLunchOption](state, { payload }) {
    let lunchOptions;
    const option = _.find(state.lunchOptions, (lunchOpt: LunchOption) => lunchOpt.name === payload.name);
    if (option) {
      lunchOptions = state.lunchOptions;
    } else {
      lunchOptions = [
        ...state.lunchOptions,
        {
          id: payload.id,
          name: payload.name,
        },
      ];
    }

    const newPeopleChoices = upsert(
      state.peopleChoices,
      (personChoice) => (personChoice.person.id === payload.person.id),
      { person: payload.person, choiceId: option ? option.id : payload.id }
    );

    return {
      lunchOptions,
      optionName: '',
      enteringNewOption: false,
      peopleChoices: newPeopleChoices,
    };
  },

  [ToggleEnterNewLunchOption](state) {
    return { enteringNewOption: !state.enteringNewOption };
  },

  [EnterLunchOptionName](state, { payload }) {
    return { optionName: payload.name };
  },
});

export default lunchReducer;
