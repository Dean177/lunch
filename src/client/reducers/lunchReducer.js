import createReducer from './../util/createReducer';
import { find } from 'underscore';
import { AddLunchOption, ChooseLunchOption, EnterLunchOptionName, ToggleEnterNewLunchOption } from '../../shared/constants/actionTypes';

const initialState = {
  optionName: '',
  selectedOptionId: 'Tesco',
  enteringNewOption: false,
  lunchOptions: [
    { id: 0, name: 'Tesco'},
    { id: 1, name: 'Boots'},
    { id: 2, name: 'Market'},
    { id: 3, name: 'Chinese'},
  ],
  peopleChoices: [
    { person: { id: 0, name: 'Badger'}, choice: { id: 0, name: 'Tesco'} },
    { person: { id: 1, name: 'Shrew'}, choice: { id: 3, name: 'Chinese'} },
    { person: { id: 2, name: 'Aardvark'}, choice: { id: 3, name: 'Chinese'} },
    { person: { id: 3, name: 'Cat'}, choice: { id: 1, name: 'Boots'} },
    { person: { id: 4, name: 'Alpaca'}, choice: { id: 2, name: 'Market'} },
    { person: { id: 5, name: 'Brown Bear'}, choice: { id: 1, name: 'Boots'} },
  ],
};

const lunchReducer = createReducer(initialState, {
  [AddLunchOption](state, action) {
    let lunchOptions;
    let selectedOptionId;
    const option = find(state.lunchOptions, ({ name }) => name === action.name);
    if (option) {
      selectedOptionId = option.id;
      lunchOptions = state.lunchOptions;
    } else {
      const newId = state.lunchOptions.length;
      selectedOptionId = newId;
      lunchOptions = [
        ...state.lunchOptions,
        {
          id: newId,
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
