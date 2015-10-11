import { expect } from 'chai';
import { AddLunchOption, ChooseLunchOption, EnterLunchOptionName, ToggleEnterNewLunchOption, OptionChoices, RemoteLunchChoice } from '../../../../src/shared/constants/actionTypes';
import lunchReducer from '../../../../src/client/reducers/lunchReducer';

const initialState = {
  optionName: 'Name for the new option',
  selectedOptionId: '',
  enteringNewOption: false,
  lunchOptions: [ { id: '0', name: 'Tesco'} ],
  peopleChoices: [ ],
};

describe('lunchReducer', () => {

  describe(OptionChoices, () => {
    it('Sets the lunch options and people choices', () => {
      const peopleChoicesAction = {
        type: OptionChoices,
        payload: {
          lunchOptions: [ { id: '0', name: 'Market'}, { id: '0', name: 'Chinese'}],
          peopleChoices: [ { person: { id: '0', name: 'Boar'}, choiceId: '0' }],
        },
      };
      const newState = lunchReducer(initialState, peopleChoicesAction);

      expect(newState.lunchOptions).to.deep.equal(peopleChoicesAction.payload.lunchOptions);
      expect(newState.peopleChoices).to.deep.equal(peopleChoicesAction.payload.peopleChoices);
    })
  });

  describe(ChooseLunchOption, () => {
    const chooseLunchOptionAction = { type: ChooseLunchOption, payload: { id: 'iiii-chos-eyou' } };
    const newState = lunchReducer(initialState, chooseLunchOptionAction);

    it('Sets the users selected id', () => {
      expect(newState.selectedOptionId).to.equal(chooseLunchOptionAction.payload.id);
    });
  });

  describe(RemoteLunchChoice, () => {});

  describe(AddLunchOption, () => {
    const lunchOption =  { id: 'uuuu-uuuu-iiii-dddd', name: 'No 1 Harbourside' };
    const addLunchOption = {
      type: AddLunchOption,
      payload: {
        id: lunchOption.id,
        name: lunchOption.name,
      },
    };
    const newState = lunchReducer(initialState, addLunchOption);

    it('Adds a lunch option', () => {
      expect(newState.lunchOptions.length).to.equal(initialState.lunchOptions.length + 1);
    });

    it('Selects the newly added lunch option', () => {
      expect(newState.selectedOptionId).to.equal(lunchOption.id);
    });

    it('Clears the text used to store the name', () => {
      expect(newState.optionName).to.equal('');
    });

    it('Will not add an option if it already exists', () => {
      const sameNameLunchOption =  { id: 'newu-uuuu-iiii-dddd', name: 'No 1 Harbourside' };
      const nextState = lunchReducer(newState, sameNameLunchOption);

      expect(nextState.lunchOptions.length).to.equal(newState.lunchOptions.length);
    });
  });

  describe(ToggleEnterNewLunchOption, () => {
    it('Toggles weather the user is entering a new option', () => {
      const toggleEnterAction = { type: ToggleEnterNewLunchOption };
      const newState = lunchReducer(initialState, toggleEnterAction);

      expect(newState.enteringNewOption).to.equal(!initialState.enteringNewOption);
    });
  });

  describe(EnterLunchOptionName, () => {
    it('Sets the optionName text', () => {
      const enterLunchOptionNameAction = {
        type: EnterLunchOptionName,
        payload: {
          name: 'some name',
        },
      };
      const newState = lunchReducer(initialState, enterLunchOptionNameAction);

      expect(newState.optionName).to.equal(enterLunchOptionNameAction.payload.name);
    });
  });
});
