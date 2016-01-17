import createStateMergeReducer from '../util/createStateMergeReducer';
import { find } from 'underscore';
import upsert from '../../shared/util/upsert';
import {
  ChangeImageUrl,
  ChangeName,
} from '../../shared/constants/actionTypes/userActionTypes';
import {
  AddLunchOption,
  ChangeOrderDetails,
  EnterLunchOptionName,
  GoneToFetchLunch,
  NotGettingLunch,
  OptionChoices,
  ToggleEnterNewLunchOption,
  UpdatedPersonChoice,
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

  [ChangeImageUrl]({ peopleChoices }, { payload: { id, url } }) {
    const comparator = (pChoice) => (pChoice.person.id === id);
    const existingChoice = find(peopleChoices, comparator);
    return {
      peopleChoices: upsert(peopleChoices, comparator, { ...existingChoice, person: { ...existingChoice.person, imageUrl: url } }),
    };
  },

  [ChangeName]({ peopleChoices }, { payload: { id, name } }) {
    const comparator = (pChoice) => (pChoice.person.id === id);
    const existingChoice = find(peopleChoices, comparator);
    return {
      peopleChoices: upsert(peopleChoices, comparator, { ...existingChoice, person: { ...existingChoice.person, name } }),
    };
  },

  [ChangeOrderDetails]({ peopleChoices }, { payload: { orderDetails }, meta: { user } }) {
    const isUserLunchChoice = (personChoice) => (personChoice.person.id === user.id);
    const userLunchChoice = find(peopleChoices, isUserLunchChoice);
    const updatedOrderDetails = { ...userLunchChoice, orderDetails };
    return {
      peopleChoices: upsert(peopleChoices, isUserLunchChoice, updatedOrderDetails),
    };
  },

  [EnterLunchOptionName](state, { payload }) {
    return { optionName: payload.name };
  },

  [GoneToFetchLunch]({ peopleChoices }, { payload: { lunchOptionId } }) {
    return {
      peopleChoices: peopleChoices.filter(personChoice => personChoice.choiceId !== lunchOptionId),
    };
  },

  [NotGettingLunch]({ peopleChoices }, { payload: { lunchOptionId }, meta: { user } }) {
    const comparator = (personChoice) => (personChoice.choiceId === lunchOptionId && personChoice.person.id === user.id);
    const existingChoice = find(peopleChoices, comparator);
    return {
      peopleChoices: upsert(peopleChoices, comparator, { ...existingChoice, isFetching: false }),
    };
  },

  [OptionChoices](state, { payload: { lunchOptions, peopleChoices } }) {
    return {
      lunchOptions: lunchOptions || [],
      peopleChoices: peopleChoices || [],
    };
  },

  [ToggleEnterNewLunchOption](state) {
    return { enteringNewOption: !state.enteringNewOption };
  },

  [UpdatedPersonChoice]({ peopleChoices }, action) {
    const updatedChoice = action.payload;
    return {
      peopleChoices: upsert(
        peopleChoices,
        (personChoice) => (personChoice.person.id === updatedChoice.person.id),
        updatedChoice
      ),
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
});

export default lunchReducer;
