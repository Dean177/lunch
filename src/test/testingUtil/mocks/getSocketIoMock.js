const chai = require('chai');
chai.use(require('chai-spies'));
const { spy } = chai;

function getSocketMock() {
  return {
    emit: spy(),
    broadcast: { emit: spy() },
  };
}

function getSocketIoMock() {
  return {};
}

module.exports = {
  getSocketMock,
  getSocketIoMock,
};
