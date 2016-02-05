describe('LunchOptionRepo', () => {
  describe('add', () => {
    it("Checks the lunch option doesn't already exist");

    it("Doesn't create the lunch option if it already exist");

    it("Creates a new option if it doesn't exist");
  });

  describe('isExistingOption', () => {
    it('Returns the option if it exists');
    it("Returns false if it doesn't");
  });

  describe('updateLastChosen', () => {
    it('Returns the updated id');
  });

  describe('getAll', () => {
    it('Only returns rows lastChosen after the cutoff time');
  });
});
