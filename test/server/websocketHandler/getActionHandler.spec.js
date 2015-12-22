import chai, { expect } from 'chai';
import spies from 'chai-spies';
import getActionHandler, { validateActionFormat } from '../../../src/server/websocketHandler/getActionHandler';
chai.use(spies);

describe('validateActionFormat', () => {
  let onError;

  beforeEach(() => {
    onError = chai.spy();
  });

  it('Accepts valid actions', () => {
    validateActionFormat({ type: 'Some type', payload: {}, meta: { user: {} } }, onError);
    expect(onError).to.not.have.been.called();
  });

  it('Rejects actions with a missing type', () => {
    validateActionFormat({ payload: {}, meta: { user: {} } }, onError);
    expect(onError).to.have.been.called();
  });

  it('Rejects actions with a missing payload', () => {
    validateActionFormat({ type: 'Some type', meta: { user: {} } }, onError);
    expect(onError).to.have.been.called();
  });

  it('Rejects actions with a missing meta.user', () => {
    validateActionFormat({ type: 'Some type', payload: {} }, onError);
    expect(onError).to.have.been.called();
  });
});

describe('getActionHandler', () => {
  const spyAction = { type: 'SPY_ACTION_TYPE', payload: {}, meta: { user: {} } };
  let actionHandler;
  let io;
  let socket;
  let onActionType;

  beforeEach(() => {
    io = chai.spy();
    socket = chai.spy();
    onActionType = chai.spy();
    actionHandler = getActionHandler({ [spyAction.type]: onActionType })(io)(socket);
  });

  it('Should call the handler matching an actions type', () => {
    actionHandler(spyAction);

    expect(onActionType).to.have.been.called();
  });

  it('Should call the handler with the action, the socket, and the server', () => {
    expect(actionHandler).to.be.a('function');
    actionHandler(spyAction);

    expect(onActionType).to.have.been.called.with(io, socket, spyAction);
  });
});
