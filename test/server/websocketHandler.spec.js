import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { values } from 'underscore';
import configureWebsocket, { getActionHandler, validateActionFormat, websocketHandler } from '../../src/server/websocketHandler';
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
  let spyIo;
  let socket;
  let onActionType;

  beforeEach(() => {
    spyIo = chai.spy();
    socket = chai.spy();
    onActionType = chai.spy();
    actionHandler = getActionHandler({ [spyAction.type]: onActionType }, spyIo)(socket);
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

describe('websocketHandler', () => {
  let actionHandlerApy;
  let connections;
  let socketSpy;

  beforeEach(() => {
    actionHandlerApy = chai.spy();
    connections = {};
    socketSpy = { on: chai.spy() };
  });

  it('Gets a new action handler for every websocket connection', () => {
    websocketHandler(connections, actionHandlerApy)(socketSpy);
    expect(actionHandlerApy).to.have.been.called.with(socketSpy);
  });

  it('Should store each new websocket connection in the provided object', () => {
    websocketHandler(connections, actionHandlerApy)(socketSpy);
    expect(values(connections)[0].socket).to.equal(socketSpy);
  });
});

describe('configureWebsocket', () => {
  it('Should attach the "connection" handler', () => {
    const spyIo = { on: chai.spy() };
    configureWebsocket(spyIo, {});
    expect(spyIo.on).to.have.been.called.with('connection');
  });
});
