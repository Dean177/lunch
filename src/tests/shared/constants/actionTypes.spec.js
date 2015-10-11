import { expect } from 'chai';
import { values, uniq } from 'underscore';
import * as applicationConstants from '../../../shared/constants/actionTypes';

describe('actionTypes', () => {
  it('Should have no constant with the same value', () => {
    const constantValues = values(applicationConstants);

    expect(constantValues.length).to.be(uniq(constantValues).length);
  });
});
