describe('PersonChoiceRepo', () => {
  describe('getAll', () => {
    it('Only returns rows lastChosen after the cutoff time');
    it('Returns the Person as an object');
  });

  describe('add', () => {
    it("Checks the name doesn't already exist");

    it("Doesn't create the lunch option if it already exist");

    it("Creates a new option if it doesn't exist");
  });

  describe('clearFetchers', () => {
    it('Sets is isFetching to false for all matching peopleChoices');
  });

  describe('updateLunchOptionId', () => {
    it('Returns the updated lunchOption');
  });

  describe('updateOrderDetails', () => {
    it('Returns the updated lunchOption');
  });

  describe('updatePaymentAmount', () => {
    it('Returns the updated lunchOption');
  });

  describe('updateWhoIsFetchingLunch', () => {
    it('Returns the updated lunchOption');
  });

  describe('updateGoneToFetchLunch', () => {
    it('Returns the updated lunchOption');
  });
});
