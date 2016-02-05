import chai from 'chai';
import spies from 'chai-spies';
import Promise from 'promise';
chai.use(spies);
const { expect } = chai;
import onAddLunchOption from '../../../server/actionHandlers/onAddLunchOption';
import { addLunchOption } from '../../../shared/actionCreators/lunchActionCreators';


describe('onAddLunchOption', () => {
  const testUser = { id: '123', name: 'test-user' };
  const addExistingLunchOption = addLunchOption({ id: '1', name: 'Sheep' }, 'Exists', '2');
  addExistingLunchOption.meta.user = testUser;
  const addNonExistingLunchOption = addLunchOption({ id: '1', name: 'Sheep' }, 'Beetroot', '2');
  addNonExistingLunchOption.meta.user = testUser;

  const ioMock = { };
  const socketMock = { emit: chai.spy(), broadcast: { emit: chai.spy() } };

  let addSpy;
  let findByNameSpy;
  const LunchRepoMock = {
    add: (name) => {
      addSpy(name);
      return Promise.resolve({ id: '1', name });
    },
    findByName: (name) => {
      findByNameSpy(name);
      return Promise.resolve(name === 'Exists' ? { id: '1', name } : undefined);
    },
  };

  let updateLunchOptionIdSpy;
  const PersonChoiceRepoMock = {
    updateLunchOptionId: (person, lunchOptionId) => {
      updateLunchOptionIdSpy(lunchOptionId);
      return Promise.resolve({ person, lunchOptionId });
    },
  };

  beforeEach(() => {
    addSpy = chai.spy();
    findByNameSpy = chai.spy();
    updateLunchOptionIdSpy = chai.spy();
  });

  it('Creates the option', () => {
    const onAddLunchWithMocks = onAddLunchOption(LunchRepoMock, PersonChoiceRepoMock);
    return onAddLunchWithMocks(ioMock, socketMock, addNonExistingLunchOption).then(() => {
      expect(addSpy).to.have.been.called();
    });
  });

  it('Updates the users choice', () => {
    const onAddLunchWithMocks = onAddLunchOption(LunchRepoMock, PersonChoiceRepoMock);
    return onAddLunchWithMocks(ioMock, socketMock, addNonExistingLunchOption).then(() => {
      expect(updateLunchOptionIdSpy).to.have.been.called();
    });
  });

  it('Updates other clients once the option has been added', () => {
    return onAddLunchOption(LunchRepoMock, PersonChoiceRepoMock)(ioMock, socketMock, addNonExistingLunchOption)
      .then(() => {
        expect(socketMock.broadcast.emit).to.have.been.called();
      });
  });
});
