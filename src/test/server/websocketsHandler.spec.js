import chai from 'chai';
import spies from 'chai-spies';
const { expect } = chai;
chai.use(spies);
import {
  getSocketActionHandler,
  validateActionFormat,
  getWebsocketHandler,
} from '../../server/websocketHandler';

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

describe('getSocketActionHandler', () => {
  const spyAction = { type: 'SPY_ACTION_TYPE', payload: {}, meta: { user: {} } };
  let actionHandler;
  let spyIo;
  let socket;
  let onActionType;

  beforeEach(() => {
    spyIo = chai.spy();
    socket = chai.spy();
    onActionType = chai.spy();
    actionHandler = getSocketActionHandler({ [spyAction.type]: onActionType }, spyIo)(socket);
  });

  it('Should call the handler matching an actions type', () => {
    actionHandler(spyAction);

    expect(onActionType).to.have.been.called();
  });

  it('Should call the handler with the action, the socket, and the server', () => {
    expect(actionHandler).to.be.a('function');
    actionHandler(spyAction);

    expect(onActionType).to.have.been.called.with(spyIo, socket, spyAction);
  });
});

describe('getWebsocketHandler', () => {
  let actionHandlerApy;
  let socketSpy;

  beforeEach(() => {
    actionHandlerApy = chai.spy();
    socketSpy = { on: chai.spy() };
  });

  it('Gets a new action handler for every websocket connection', () => {
    getWebsocketHandler(actionHandlerApy)(socketSpy);
    expect(actionHandlerApy).to.have.been.called.with(socketSpy);
  });
});
