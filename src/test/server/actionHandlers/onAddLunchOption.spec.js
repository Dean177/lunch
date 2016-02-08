const chai = require('chai');
chai.use(require('chai-spies'));
const { expect, spy } = chai;
import onAddLunchOption from '../../../server/actionHandlers/onAddLunchOption';
import { addLunchOption } from '../../../shared/actionCreators/lunchActionCreators';
const getLunchRepoMock = require('../../testingUtil/mocks/getLunchRepoMock');
const getPersonRepoMock = require('../../testingUtil/mocks/getPersonRepoMock');
const { getSocketMock } = require('../../testingUtil/mocks/getSocketIoMock');


describe('onAddLunchOption', () => {
  const testUser = { id: '123', name: 'test-user' };
  const addExistingLunchOptionAction = addLunchOption({ id: '1', name: 'Sheep' }, 'Exists', '2');
  addExistingLunchOptionAction.meta.user = testUser;
  const addNonExistingLunchOptionAction = addLunchOption({ id: '1', name: 'Sheep' }, 'Beetroot', '2');
  addNonExistingLunchOptionAction.meta.user = testUser;

  const ioMock = { };
  let socketMock;

  let addSpy;
  let findByNameSpy;
  let LunchRepoMock;

  let updateLunchOptionIdSpy;
  let PersonChoiceRepoMock;

  beforeEach(() => {
    socketMock = getSocketMock();

    addSpy = spy();
    findByNameSpy = spy();
    LunchRepoMock = getLunchRepoMock(addSpy, findByNameSpy);

    updateLunchOptionIdSpy = spy();
    PersonChoiceRepoMock = getPersonRepoMock(updateLunchOptionIdSpy);
  });

  it('Creates the option', () => {
    const onAddLunchWithMocks = onAddLunchOption(LunchRepoMock, PersonChoiceRepoMock);
    return onAddLunchWithMocks(ioMock, socketMock, addNonExistingLunchOptionAction).then(() => {
      expect(addSpy).to.have.been.called();
    });
  });

  it('Updates the users choice', () => {
    const onAddLunchWithMocks = onAddLunchOption(LunchRepoMock, PersonChoiceRepoMock);
    return onAddLunchWithMocks(ioMock, socketMock, addNonExistingLunchOptionAction).then(() => {
      expect(updateLunchOptionIdSpy).to.have.been.called();
    });
  });

  it('Updates other clients once the option has been added', () => {
    return onAddLunchOption(LunchRepoMock, PersonChoiceRepoMock)(ioMock, socketMock, addNonExistingLunchOptionAction)
      .then(() => {
        expect(socketMock.broadcast.emit).to.have.been.called();
      });
  });
});
