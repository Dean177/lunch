import { expect } from 'chai';
import mockLocalStorage from '../../testingUtil/mockLocalStorage';
import createUserReducer from '../../../../src/client/reducers/createUserReducer';
import { changeName } from '../../../../src/client/actionCreators/userActionCreator';

const initialState = {
  id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
  name: 'Llama',
};

describe('createUserReducer', () => {
  const userReducer = createUserReducer(mockLocalStorage());

  it('Can change the users name', () => {
    const changeNameAction = changeName(initialState.id, 'Alpaca');
    const newState = userReducer(initialState, changeNameAction);

    expect(newState.name).to.equal('Alpaca');
    expect(newState.id).to.equal(initialState.id);
  });
});
