/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import { mapObject } from 'underscore';
import * as userActionCreators from '../../../../src/client/actionCreators/userActionCreator';
import * as lunchActionCreators from '../../../../src/client/actionCreators/lunchActionCreators';

describe('actionCreators should produce an action which has a payload and a type.', () => {
  const actionCreators = Object.assign({}, userActionCreators, lunchActionCreators);

  mapObject(actionCreators, (actionCreator, key) => {
    it(key, () => {
      const action = actionCreator();
      expect(action.type).to.not.be.undefined;
      expect(action.payload).to.not.be.undefined;
    });
  });
});
