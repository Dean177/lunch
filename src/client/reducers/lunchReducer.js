import createReducer from './../util/createReducer';
import { find } from 'underscore';
import { AddLunchOption, ChooseLunchOption, EnterLunchOptionName, ToggleEnterNewLunchOption } from '../../shared/constants/actionTypes';

const initialState = {
  optionName: '',
  selectedOptionId: '1',
  enteringNewOption: false,
  lunchOptions: [
    { id: 0, name: 'Tesco'},
    { id: 1, name: 'Boots'},
    { id: 2, name: 'Market'},
    { id: 3, name: 'Chinese'},
  ],
  peopleChoices: [
    { person: { id: 0, name: 'Badger'}, choiceId: 0 },
    { person: { id: 1, name: 'Shrew'}, choiceId: 3 },
    { person: { id: 2, name: 'Aardvark'}, choiceId: 3 },
    { person: { id: 3, name: 'Cat'}, choiceId: 1  },
    { person: { id: 4, name: 'Alpaca'}, choiceId: 2 },
    { person: { id: 5, name: 'Brown Bear'}, choiceId: 1 },
  ],
};

const lunchReducer = createReducer(initialState, {
  [AddLunchOption](state, action) {
    let lunchOptions;
    let lunchOption;
    let selectedOptionId;
    const option = find(state.lunchOptions, ({ name }) => name === action.name);
    if (option) {
      selectedOptionId = option.id;
      lunchOptions = state.lunchOptions;
    } else {
      selectedOptionId = action.id;
      lunchOptions = [
        ...state.lunchOptions,
        {
          id: action.id,
          name: action.name,
        },
      ];
    }

    return {
      ...state,
      lunchOptions,
      selectedOptionId,
      optionName: '',
      enteringNewOption: false,
    };
  },

  [ChooseLunchOption](state, action) {
    return {
      ...state,
      selectedOptionId: action.id,
    };
  },

  [ToggleEnterNewLunchOption](state) {
    return {
      ...state,
      enteringNewOption: !state.enteringNewOption,
    };
  },

  [EnterLunchOptionName](state, action) {
    return {
      ...state,
      optionName: action.name,
    };
  },
});

export default lunchReducer;
