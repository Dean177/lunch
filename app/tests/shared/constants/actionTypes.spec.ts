import * as chai from 'chai';
import * as _ from 'underscore';
import * as applicationConstants from '../../../shared/constants/actionTypes';

describe('actionTypes', () => {
  it('Should have no constant with the same value', () => {
    const constantValues = _.values(applicationConstants);

    chai.expect(constantValues).to.deep.equal(_.uniq(constantValues));
  });
});
