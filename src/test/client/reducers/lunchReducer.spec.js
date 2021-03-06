const chai = require('chai');
chai.use(require('dirty-chai'));
const expect = chai.expect;
import { find } from 'underscore';
import {
  AddLunchOption,
  EnterLunchOptionName,
  OptionChoices,
  ToggleEnterNewLunchOption,
  UserLunchChoice,
} from '../../../shared/constants/actionTypes/lunchActionTypes';
import lunchReducer from '../../../client/reducers/lunchReducer';

const initialState = {
  optionName: 'Name for the new option',
  selectedOptionId: '',
  enteringNewOption: false,
  lunchOptions: [{ id: '0', name: 'Tesco' }],
  peopleChoices: [],
};

describe('lunchReducer', () => {
  describe(AddLunchOption, () => {
    const lunchOption = { id: 'uuuu-uuuu-iiii-dddd', name: 'No 1 Harbourside' };
    const ferret = { id: 'ferr', name: 'Ferret' };
    const addLunchOption = {
      type: AddLunchOption,
      payload: { id: lunchOption.id, name: lunchOption.name, person: ferret },
    };
    const newState = lunchReducer(initialState, addLunchOption);

    it('Adds a lunch option', () => {
      expect(newState.lunchOptions.length).to.equal(initialState.lunchOptions.length + 1);
    });

    it('Selects the newly added lunch option', () => {
      expect(newState.peopleChoices.length).to.equal(initialState.peopleChoices.length + 1);
      const personChoice = find(
        newState.peopleChoices,
        (pChoice) => pChoice.person.id === ferret.id
      );
      expect(personChoice.lunchOptionId).to.equal(lunchOption.id);
    });

    it('Clears the text used to store the name', () => {
      expect(newState.optionName).to.equal('');
    });

    it('Will not add an option if it already exists', () => {
      const sameNameLunchOption = {
        payload: { id: 'newu-uuuu-iiii-dddd', name: 'No 1 Harbourside', person: ferret },
      };
      const nextState = lunchReducer(newState, sameNameLunchOption);

      expect(nextState.lunchOptions.length).to.equal(newState.lunchOptions.length);
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

  describe(OptionChoices, () => {
    it('Sets the lunch options and people choices', () => {
      const peopleChoicesAction = {
        type: OptionChoices,
        payload: {
          lunchOptions: [{ id: '0', name: 'Market' }, { id: '0', name: 'Chinese' }],
          peopleChoices: [{ person: { id: '0', name: 'Boar' }, lunchOptionId: '0' }],
        },
      };
      const newState = lunchReducer(initialState, peopleChoicesAction);

      expect(newState.lunchOptions).to.deep.equal(peopleChoicesAction.payload.lunchOptions);
      expect(newState.peopleChoices).to.deep.equal(peopleChoicesAction.payload.peopleChoices);
    });
  });

  describe(ToggleEnterNewLunchOption, () => {
    it('Toggles weather the user is entering a new option', () => {
      const toggleEnterAction = { type: ToggleEnterNewLunchOption };
      const newState = lunchReducer(initialState, toggleEnterAction);

      expect(newState.enteringNewOption).to.equal(!initialState.enteringNewOption);
    });
  });

  describe(UserLunchChoice, () => {
    const egret = { id: 4, name: 'Egret' };
    const lunchOptionId = 'iiii-chos-eyou';
    const chooseLunchOptionAction = {
      type: UserLunchChoice,
      payload: { lunchOptionId, person: egret },
    };
    const firstChoiceState = lunchReducer(initialState, chooseLunchOptionAction);

    it('Adds the lunchChoice when the person has made no previous selection', () => {
      const personChoice = find(
        firstChoiceState.peopleChoices,
        (pChoice) => pChoice.person.id === egret.id
      );
      expect(firstChoiceState.peopleChoices).not.to.be.empty();
      expect(personChoice.lunchOptionId).to.equal(lunchOptionId);
    });

    it('Updates the lunchOptionId when person has already made a choice', () => {
      const secondChoice = {
        type: UserLunchChoice,
        payload: { lunchOptionId: '0', person: egret },
      };
      const secondChoiceState = lunchReducer(firstChoiceState, secondChoice);
      expect(secondChoiceState.peopleChoices.length)
        .to.equal(firstChoiceState.peopleChoices.length);
      expect(secondChoiceState.peopleChoices[0].lunchOptionId).to.equal('0');
    });
  });
});
