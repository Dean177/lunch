const Promise = require('promise');

function getPersonRepoMock(updateLunchOptionIdSpy) {
  return {
    updateLunchOptionId: (person, lunchOptionId) => {
      updateLunchOptionIdSpy(lunchOptionId);
      return Promise.resolve({ person, lunchOptionId });
    },
  };
}

module.exports = getPersonRepoMock;
