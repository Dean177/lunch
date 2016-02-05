describe('PersonRepo', () => {
  describe('add', () => {
    it("Checks the name doesn't already exist");

    it("Doesn't create the lunch option if it already exist");

    it("Creates a new option if it doesn't exist");
  });

  describe('findById', () => {
    it('Returns the person if they exist');
    it("Returns false if it doesn't");
  });

  describe('updateImageUrl', () => {
    it('Returns the updated person');
  });

  describe('updateName', () => {
    it('Returns the updated person');
  });

  describe('findSplitwiseAuthByUserId', () => {
    it('Returns the option if it exists');
    it("Returns false if it doesn't");
  });

  describe('addSplitwiseToken', () => {
    it('Returns the option if it exists');
    it("Returns false if it doesn't");
  });

  describe('authorizeToken', () => {
    it('Returns the option if it exists');
    it("Returns false if it doesn't");
  });

  describe('updateSplitwiseAuth', () => {
    it('Returns the option if it exists');
    it("Returns false if it doesn't");
  });
});
