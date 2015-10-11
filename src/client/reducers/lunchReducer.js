import createStateMergeReducer from '../util/createStateMergeReducer';
import { find } from 'underscore';
import upsert from '../../shared/util/upsert';
import {
  AddLunchOption,
  ChooseLunchOption,
  EnterLunchOptionName,
  ToggleEnterNewLunchOption,
  OptionChoices,
  UserLunchChoice,
  RemoteLunchChoice,
} from '../../shared/constants/actionTypes';


const initialState = {
  optionName: '',
  selectedOptionId: '',
  enteringNewOption: false,
  lunchOptions: [],
  peopleChoices: [],
};


const lunchReducer = createStateMergeReducer(initialState, {
  [OptionChoices](state, { payload: { peopleChoices, lunchOptions } }) {
    return { lunchOptions, peopleChoices };
  },

  [UserLunchChoice]({ peopleChoices }, { payload: { user, choiceId } } ) {
    const newPeopleChoices = upsert(
      peopleChoices,
      (personChoice) => (personChoice.user.id === user.id),
      { person: user, choiceId }
    );

    return { peopleChoices: newPeopleChoices };
  },

  [AddLunchOption](state, { payload }) {
    let lunchOptions;
    let selectedOptionId;
    const option = find(state.lunchOptions, ({ name }) => name === payload.name);
    if (option) {
      selectedOptionId = option.id;
      lunchOptions = state.lunchOptions;
    } else {
      selectedOptionId = payload.id;
      lunchOptions = [
        ...state.lunchOptions,
        {
          id: payload.id,
          name: payload.name,
        },
      ];
    }

    return {
      lunchOptions,
      selectedOptionId,
      optionName: '',
      enteringNewOption: false,
    };
  },

  [ChooseLunchOption](state, { payload, meta }) {
    return { selectedOptionId: payload.id };
  },

  [RemoteLunchChoice](state, action) {
    const { person, choiceId } = action.payload;
    const newPeopleChoice = upsert(state.peopleChoices, (personChoice) => personChoice.person.id === action.person.id, { person, choiceId });
    return {
      ...state,
      peopleChoices: newPeopleChoice,
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
