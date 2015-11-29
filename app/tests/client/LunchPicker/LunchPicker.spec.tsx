import '../../testingUtil/dom-mock';
import * as chai from 'chai';
import * as React from 'react';
import * as rewire from 'rewire';
import * as sinon from 'sinon';
import * as TestUtils from 'react-addons-test-utils';
import { chooseLunchOption } from '../../../client/actionCreators/lunchActionCreators';
import {Component} from 'react';
import {LunchChoice} from "../../../client/LunchPicker/LunchChoice";

const MockComponent = require('../../testingUtil/MockComponent');
const LunchPicker = rewire('../../../client/LunchPicker/LunchPicker');
LunchPicker.__set__('Measure', MockComponent);


describe.skip('LunchPicker', () => {
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

  it('Will render a LunchChoice for each option passed to it', () => {
    const LunchNode = TestUtils.renderIntoDocument(
      <LunchPicker dispatch={() => {}}
                   enteringNewOption={false}
                   optionName={''}
                   lunchOptions={lunchOptions}
                   peopleChoices={[]}
                   user={user} />
    ) as Component<any, any>;

    const renderedLunchOptions = TestUtils.scryRenderedComponentsWithType(LunchNode, LunchChoice);

    chai.expect(renderedLunchOptions.length).to.equal(lunchOptions.length);
    renderedLunchOptions.forEach((node, index) => {
      chai.expect(node.props.optionName).to.equal(lunchOptions[index].name);
    });
  });

  it('Dispatches an event when a lunch option is clicked', () => {
    const dispatch = sinon.spy();
    const LunchNode = TestUtils.renderIntoDocument(
      <LunchPicker dispatch={dispatch}
                   enteringNewOption={false}
                   optionName={''}
                   lunchOptions={lunchOptions}
                   peopleChoices={[]}
                   user={user} />
    ) as Component<any, any>;
    const renderedLunchOptions = TestUtils.scryRenderedComponentsWithType(LunchNode, LunchChoice);

    TestUtils.Simulate.click(renderedLunchOptions[0]);

    chai.expect(dispatch.calledWith(chooseLunchOption(user, lunchOptions[0].id)));
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
    ) as Component<any, any>;
    const [first, ...rest] = TestUtils.scryRenderedComponentsWithType(LunchNode, LunchChoice);

    chai.expect(first.props.chosenCount).to.equal(1);
    rest.forEach((node: LunchChoice) => {
      chai.expect(node.props.chosenCount).to.equal(0);
    });
  });

  it('Test something about user choices lining up with the lunch option?');
});
