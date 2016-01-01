import { expect } from 'chai';
import { flatten, keys, map, uniq, values } from 'underscore';
import * as lunchTypes from '../../../src/shared/constants/actionTypes/lunchActionTypes';
import * as userTypes from '../../../src/shared/constants/actionTypes/userActionTypess';
import * as authTypes from '../../../src/shared/constants/actionTypes/authActionTypes';

const actionTypes = [lunchTypes, userTypes, authTypes];

describe('actionTypes', () => {
  it('Should have no constant with the same value', () => {
    const constantValues = flatten(map(actionTypes, values));

    expect(constantValues).to.deep.equal(uniq(constantValues));
  });

  it('Should have no action type with the same key', () => {
    const constantKeys = flatten(map(actionTypes, keys));

    expect(constantKeys).to.deep.equal(uniq(constantKeys));
  });
});
