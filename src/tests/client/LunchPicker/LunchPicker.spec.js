import React from 'react';
// import '../../testingUtil/dom-mock';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import rewire from 'rewire';
import MockComponent from '../../testingUtil/MockComponent';

import { chooseLunchOption } from '../../../client/actionCreators/lunchActionCreators';
const LunchPicker = rewire('../../../client/LunchPicker/LunchPicker');
LunchPicker.__set__('Measure', MockComponent);


describe.skip('LunchPicker', () => {
  const user = {
    id: 'some-id',
    name: 'test-user',
    imageUrl: '',
  };

  const lunchOptions = [
    { id: '1', name: 'Boots', lastChosen: new Date() },
    { id: '2', name: 'Chinese', lastChosen: new Date() },
  ];

  it('Will render a LunchOption for each option passed to it', () => {
    const LunchNode = shallow(
      <LunchPicker
        dispatch={() => {}}
        enteringNewOption={false}
        optionName={''}
        lunchOptions={lunchOptions}
        peopleChoices={[]}
        user={user}
      />
    );

    const renderedLunchOptions = LunchNode.find('.LunchOption');

    expect(renderedLunchOptions.length).to.equal(lunchOptions.length);
  });

  it('Dispatches an event when a lunch option is clicked', () => {
    const dispatch = spy();
    const LunchNode = shallow(
      <LunchPicker dispatch={dispatch}
                   enteringNewOption={false}
                   optionName={''}
                   lunchOptions={lunchOptions}
                   peopleChoices={[]}
                   user={user} />
    );
    LunchNode.find('.LunchOption').simulate('click');
    expect(dispatch.calledWith(chooseLunchOption(user, lunchOptions[0].id)));
  });

  it('Will display the number of people who have chosen each option', () => {
    const peopleChoices = [{ person: user, choiceId: lunchOptions[0].id }];
    const LunchNode = shallow.renderIntoDocument(
      <LunchPicker
        dispatch={() => {}}
        enteringNewOption={false}
        optionName={''}
        lunchOptions={lunchOptions}
        peopleChoices={peopleChoices}
        user={user}
      />
    );
    const [first, ...rest] = LunchNode.find('.LunchOption');

    expect(first.props.chosenCount).to.equal(1);
    rest.forEach((node) => {
      expect(node.props.chosenCount).to.equal(0);
    });
  });

  it('Test something about user choices lining up with the lunch option?');
});
