import { expect } from 'chai';
import io from 'socket.io-client';
import { OptionChoices } from '../../shared/constants/actionTypes';
import { start, stop } from '../../server/lunch-server';

const serverTestPort = 9999;
const serverUrl = `http://localhost:${serverTestPort}`;

describe('lunch-server', () => {
  before(() => {
    start(serverTestPort, () => {});
  });

  after(stop);

  it('Should send the current lunch options and choices once a user connects', (done) => {
    const client = io.connect(serverUrl);

    client.on('message', (action) => {
      expect(action.type).to.equal(OptionChoices);
      done();
    });
  });
});
