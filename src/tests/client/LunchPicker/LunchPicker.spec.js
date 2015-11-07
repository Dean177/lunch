import '../../testingUtil/dom-mock';
import { expect } from 'chai';
import rewire from 'rewire';
import { spy } from 'sinon';
import MockComponent from '../../testingUtil/MockComponent';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { chooseLunchOption } from '../../../client/actionCreators/lunchActionCreators';
const LunchOption = require('../../../client/LunchPicker/LunchOption');
const LunchPicker = rewire('../../../client/LunchPicker/LunchPicker');
LunchPicker.__set__('Measure', MockComponent);


describe('LunchPicker', () => {
  const user = {
    id: 'some-id',
    name: 'test-user',
    imageUrl: '',
  };

  const lunchOptions = [
    { id: '1', name: 'Boots', lastChosen: new Date()},
    { id: '2', name: 'Chinese', lastChosen: new Date()},
  ];

  afterEach(() => { document.body.innerHTML = ''; });

  it('Will render a LunchOption for each option passed to it', () => {
    const LunchNode = TestUtils.renderIntoDocument(
      <LunchPicker dispatch={() => {}}
                   enteringNewOption={false}
                   optionName={''}
                   lunchOptions={lunchOptions}
                   peopleChoices={[]}
                   user={user} />
    );

    const renderedLunchOptions = TestUtils.scryRenderedComponentsWithType(LunchNode, LunchOption);

    expect(renderedLunchOptions.length).to.equal(lunchOptions.length);
    renderedLunchOptions.forEach((node, index) => {
      expect(node.props.optionName).to.equal(lunchOptions[index].name);
    });
  });

  it('Dispatches an event when a lunch option is clicked', () => {
    const dispatch = spy();
    const LunchNode = TestUtils.renderIntoDocument(
      <LunchPicker dispatch={dispatch}
                   enteringNewOption={false}
                   optionName={''}
                   lunchOptions={lunchOptions}
                   peopleChoices={[]}
                   user={user} />
    );
    const renderedLunchOptions = TestUtils.scryRenderedComponentsWithType(LunchNode, LunchOption);

    TestUtils.Simulate.click(renderedLunchOptions[0]);

    expect(dispatch.calledWith(chooseLunchOption(user, lunchOptions[0].id)));
  });

  it('Will display the number of people who have chosen each option', () => {
    const peopleChoices = [{ person: user, choiceId: lunchOptions[0].id }];
    const LunchNode = TestUtils.renderIntoDocument(
      <LunchPicker dispatch={() => {}}
                   enteringNewOption={false}
                   optionName={''}
                   lunchOptions={lunchOptions}
                   peopleChoices={peopleChoices}
                   user={user} />
    );
    const [first, ...rest] = TestUtils.scryRenderedComponentsWithType(LunchNode, LunchOption);

    expect(first.props.chosenCount).to.equal(1);
    rest.forEach((node) => {
      expect(node.props.chosenCount).to.equal(0);
    });
  });

  it('Test something about user choices lining up with the lunch option?');
});
