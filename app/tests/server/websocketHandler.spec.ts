
import * as chai from 'chai';
import * as express from 'express';
import { Server } from 'http';
import * as io from 'socket.io-client';
import { OptionChoices } from '../../shared/constants/actionTypes';
import configureWebsocketHandler from '../../server/websocketHandler';

const serverTestPort = 22222;
const serverUrl = `http://localhost:${serverTestPort}`;

describe('websocketHandler', () => {
  let httpServer;

  beforeEach((done) => {
    httpServer = new Server(express());
    configureWebsocketHandler(httpServer);
    httpServer.listen(serverTestPort, done);
  });

  afterEach((done) => {
    httpServer.close(done);
  });

  it.skip('Should send the current lunch options and choices once a user connects', (done) => {
    const client = io.connect(serverUrl);

    client.on('message', (action) => {
      chai.expect(action.type).to.equal(OptionChoices);
      client.disconnect();
      done();
    });
  });

  it('Should broadcast to all clients when a user changes their image');
});
