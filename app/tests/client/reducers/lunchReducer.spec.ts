import * as chai from 'chai';
import * as _ from 'underscore';
import { AddLunchOption, UserLunchChoice, EnterLunchOptionName, ToggleEnterNewLunchOption, OptionChoices } from '../../../shared/constants/actionTypes';
import lunchReducer from '../../../client/reducers/lunchReducer';

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
        meta: {}
      };
      const newState = lunchReducer(initialState, peopleChoicesAction);

      chai.expect(newState.lunchOptions).to.deep.equal(peopleChoicesAction.payload.lunchOptions);
      chai.expect(newState.peopleChoices).to.deep.equal(peopleChoicesAction.payload.peopleChoices);
    });
  });

  describe(UserLunchChoice, () => {
    const egret: Person = { id: '4', name: 'Egret', imageUrl: ''};
    const choiceId = '3';
    const chooseLunchOptionAction = { type: UserLunchChoice, payload: { choiceId, person: egret }, meta: {} };
    const firstChoiceState = lunchReducer(initialState, chooseLunchOptionAction);

    it('Adds the lunchChoice when the person has made no previous selection', () => {
      const personChoice = _.find(firstChoiceState.peopleChoices, (pChoice) => pChoice.person.id === egret.id);
      chai.expect(firstChoiceState.peopleChoices).not.to.be.empty;
      chai.expect(personChoice.choiceId).to.equal(choiceId);
    });

    it('Updates the choiceId when person has already made a choice', () => {
      const secondChoice = { type: UserLunchChoice, payload: { choiceId: '0', person: egret }, meta: {}};
      const secondChoiceState = lunchReducer(firstChoiceState, secondChoice);
      chai.expect(secondChoiceState.peopleChoices.length).to.equal(firstChoiceState.peopleChoices.length);
      chai.expect(secondChoiceState.peopleChoices[0].choiceId).to.equal('0');
    });
  });

  describe(AddLunchOption, () => {
    const lunchOption = { id: 'uuuu-uuuu-iiii-dddd', name: 'No 1 Harbourside' };
    const ferret = { id: 'ferr', name: 'Ferret' };
    const addLunchOption = {
      type: AddLunchOption,
      payload: { id: lunchOption.id, name: lunchOption.name, person: ferret},
      meta: {}
    };
    const newState = lunchReducer(initialState, addLunchOption);

    it('Adds a lunch option', () => {
      chai.expect(newState.lunchOptions.length).to.equal(initialState.lunchOptions.length + 1);
    });

    it('Selects the newly added lunch option', () => {
      chai.expect(newState.peopleChoices.length).to.equal(initialState.peopleChoices.length + 1);
      const personChoice: PersonChoice = _.find(newState.peopleChoices, (pChoice) => pChoice.person.id === ferret.id);
      chai.expect(personChoice.choiceId).to.equal(lunchOption.id);
    });

    it('Clears the text used to store the name', () => {
      chai.expect(newState.optionName).to.equal('');
    });

    it('Will not add an option if it already exists', () => {
      const sameNameLunchOption = { type: AddLunchOption, payload: { id: 'newu-uuuu-iiii-dddd', name: 'No 1 Harbourside', person: ferret }, meta: {} };
      const nextState = lunchReducer(newState, sameNameLunchOption);

      chai.expect(nextState.lunchOptions.length).to.equal(newState.lunchOptions.length);
    });
  });

  describe(ToggleEnterNewLunchOption, () => {
    it('Toggles weather the user is entering a new option', () => {
      const toggleEnterAction: Action = { type: ToggleEnterNewLunchOption, payload: {}, meta: {} };
      const newState = lunchReducer(initialState, toggleEnterAction);

      chai.expect(newState.enteringNewOption).to.equal(!initialState.enteringNewOption);
    });
  });

  describe(EnterLunchOptionName, () => {
    it('Sets the optionName text', () => {
      const enterLunchOptionNameAction = {
        type: EnterLunchOptionName,
        payload: {
          name: 'some name',
        },
        meta: {},
      };
      const newState = lunchReducer(initialState, enterLunchOptionNameAction);

      chai.expect(newState.optionName).to.equal(enterLunchOptionNameAction.payload.name);
    });
  });
});
