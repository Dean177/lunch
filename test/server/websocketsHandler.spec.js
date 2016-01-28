import chai from 'chai';
import spies from 'chai-spies';
import { values } from 'underscore';
import configureWebsocket, { configureActionHandlers, validateActionFormat, getWebsocketHandler } from '../../src/server/websocketHandler';
const { expect } = chai;
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

describe('configureActionHandlers', () => {
  const spyAction = { type: 'SPY_ACTION_TYPE', payload: {}, meta: { user: {} } };
  let actionHandler;
  let spyIo;
  let socket;
  let onActionType;

  beforeEach(() => {
    spyIo = chai.spy();
    socket = chai.spy();
    onActionType = chai.spy();
    actionHandler = configureActionHandlers({ [spyAction.type]: onActionType }, spyIo)(socket);
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
  let connections;
  let socketSpy;

  beforeEach(() => {
    actionHandlerApy = chai.spy();
    connections = {};
    socketSpy = { on: chai.spy() };
  });

  it('Gets a new action handler for every websocket connection', () => {
    getWebsocketHandler(connections, actionHandlerApy)(socketSpy);
    expect(actionHandlerApy).to.have.been.called.with(socketSpy);
  });

  it('Should store each new websocket connection in the provided object', () => {
    getWebsocketHandler(connections, actionHandlerApy)(socketSpy);
    expect(values(connections)[0].websocket).to.equal(socketSpy);
  });
});

describe('configureWebsockets', () => {
  it('Should attach the "connection" handler', () => {
    const spyIo = { on: chai.spy() };
    configureWebsocket(spyIo, {});
    expect(spyIo.on).to.have.been.called.with('connection');
  });
});
