const chai = require('chai');
const expect = chai.expect;
import { ChangeImageUrl, ChangeName } from '../../../shared/constants/actionTypes/userActionTypes';
import { changeImageUrl, changeName } from '../../../shared/actionCreators/userActionCreator';
import lunchReducer from '../../../client/reducers/lunchReducer';

const initialState = {
  peopleChoices: [
    {
      lunchOptionId: 'a',
      dateChosen: new Date().getTime(),
      isFetching: false,
      orderDetails: '',
      paymentAmount: '',
      person: { id: '1', imageUrl: 'http://example.com/duck.jpg', name: 'Duck' },
    },
    {
      lunchOptionId: 'b',
      dateChosen: new Date().getTime(),
      isFetching: false,
      orderDetails: '',
      paymentAmount: '',
      person: { id: '1', imageUrl: 'http://example.com/goose.jpg', name: 'Goose' },
    },
  ],
};

describe('usersReducer', () => {
  describe(ChangeImageUrl, () => {
    it('Should update the specified users imageUrl', () => {
      const firstUserId = initialState.peopleChoices[0].person.id;
      const newImageUrl = 'http://example.com/duck2.png';
      const action = changeImageUrl(firstUserId, newImageUrl);

      const newState = lunchReducer(initialState, action);
      expect(newState.peopleChoices[0].person.imageUrl).to.equal(newImageUrl);
      expect(newState.peopleChoices[0].lunchOptionId)
        .to.equal(initialState.peopleChoices[0].lunchOptionId);
      expect(newState.peopleChoices[1].person.imageUrl)
        .to.equal(initialState.peopleChoices[1].person.imageUrl);
    });
  });

  describe(ChangeName, () => {
    it('Should update the specified users name', () => {
      const firstUserId = initialState.peopleChoices[0].person.id;
      const newName = 'Donald';
      const action = changeName(firstUserId, newName);

      const newState = lunchReducer(initialState, action);
      expect(newState.peopleChoices[0].person.name).to.equal(newName);
      expect(newState.peopleChoices[0].lunchOptionId)
        .to.equal(initialState.peopleChoices[0].lunchOptionId);
      expect(newState.peopleChoices[1].person.name)
        .to.equal(initialState.peopleChoices[1].person.name);
    });
  });
});
