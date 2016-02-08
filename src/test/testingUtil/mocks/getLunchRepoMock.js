const Promise = require('promise');

function getLunchRepoMock(addSpy, findByNameSpy) {
  return {
    add: (name) => {
      addSpy(name);
      return Promise.resolve({ id: '1', name });
    },
    findByName: (name) => {
      findByNameSpy(name);
      return Promise.resolve(name === 'Exists' ? { id: '1', name } : undefined);
    },
  };
}

module.exports = getLunchRepoMock;
