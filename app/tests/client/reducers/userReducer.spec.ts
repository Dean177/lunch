import { expect } from 'chai';
import mockLocalStorage from '../../testingUtil/mockLocalStorage';
import createUserReducer from '../../../client/reducers/createUserReducer';
import { changeName, changeImageUrl } from '../../../client/actionCreators/userActionCreator';

const initialState = {
  id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
  name: 'Llama',
  imageUrl: 'default',
};

describe('createUserReducer', () => {
  const userReducer = createUserReducer(mockLocalStorage());

  it('Can change the users name', () => {
    const changeNameAction = changeName(initialState.id, 'Alpaca');
    const newState = userReducer(initialState, changeNameAction);

    expect(newState.name).to.equal('Alpaca');
    expect(newState.id).to.equal(initialState.id);
  });

  it('Can change the users image', () => {
    const newImageUrl = 'http://imgur.com/awww';
    const changeNameAction = changeImageUrl(initialState.id, newImageUrl);
    const newState = userReducer(initialState, changeNameAction);

    expect(newState.imageUrl).to.equal(newImageUrl);
  });
});
