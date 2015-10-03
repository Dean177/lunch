import { expect } from 'chai';
import userReducer from '../../../../src/client/reducers/userReducer';
import { changeName } from '../../../../src/client/actionCreators/userActionCreator';

const initialState = {
  id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
  name: 'Llama',
};

describe('userReducer', () => {
  it('Can change the users name', () => {
    const changeNameAction = changeName(initialState.id, 'Alpaca');
    const newState = userReducer(initialState, changeNameAction);

    expect(newState.name).to.equal('Alpaca');
    expect(newState.id).to.equal(initialState.id);
  })
});
