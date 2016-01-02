import createStateMergeReducer from '../util/createStateMergeReducer';
import { find } from 'underscore';
import upsert from '../../shared/util/upsert';
import {
  AddLunchOption,
  EnterLunchOptionName,
  OptionChoices,
  ToggleEnterNewLunchOption,
  UserLunchChoice,
} from '../../shared/constants/actionTypes/lunchActionTypes';


const initialState = {
  optionName: '',
  enteringNewOption: false,
  lunchOptions: [],
  peopleChoices: [],
};

const lunchReducer = createStateMergeReducer(initialState, {
  [AddLunchOption](state, { payload }) {
    let lunchOptions;
    const option = find(state.lunchOptions, ({ name }) => name === payload.name);
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

  [OptionChoices](state, { payload: { lunchOptions, peopleChoices } }) {
    return {
      lunchOptions: lunchOptions || [],
      peopleChoices: peopleChoices || [],
    };
  },

  [UserLunchChoice]({ peopleChoices }, { payload: { person, choiceId } }) {
    const newPeopleChoices = upsert(
      peopleChoices,
      (personChoice) => (personChoice.person.id === person.id),
      { person, choiceId }
    );

    return { peopleChoices: newPeopleChoices };
  },

  [ToggleEnterNewLunchOption](state) {
    return { enteringNewOption: !state.enteringNewOption };
  },

  [EnterLunchOptionName](state, { payload }) {
    return { optionName: payload.name };
  },
});

export default lunchReducer;
