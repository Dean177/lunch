import './LunchPicker.scss';
import React, { Component, PropTypes } from 'react';
import Measure from 'react-measure';
import { Motion, spring } from 'react-motion';
import { bindActionCreators } from 'redux';
import * as LunchActionCreators from '../actionCreators/lunchActionCreators';
import OptionAdder from './OptionAdder';
import LunchOption from './LunchOption';
import PersonSquare from './../components/PersonSquare/PersonSquare';
import { difference } from 'underscore';

class LunchPicker extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    enteringNewOption: PropTypes.bool.isRequired,
    optionName: PropTypes.string.isRequired,
    lunchOptions: PropTypes.array.isRequired,
    peopleChoices: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    squareDimension: 0,
  };

  onOptionSelected(choiceId) {
    this.props.dispatch(LunchActionCreators.chooseLunchOption(this.props.user, choiceId));
  }

  getChooserCount(peopleChoices, personId, userChoiceId) {
    return peopleChoices
      .filter(({ choiceId }) => (choiceId === userChoiceId))
      .map(({ person }) => (person.id))
      .indexOf(personId);
  }

  getChoiceIndex(lunchOptions, choiceId) {
    return lunchOptions
      .map(({ id }) => (id))
      .indexOf(choiceId);
  }

  render() {
    const {
      enteringNewOption,
      optionName,
      peopleChoices,
      lunchOptions,
      dispatch,
      user,
    } = this.props;

    const { squareDimension } = this.state;

    const choices = peopleChoices
      .filter(({ choiceId }) => !!choiceId)
      .map(({ person, choiceId }) => {
        const xPos = squareDimension * this.getChooserCount(peopleChoices, person.id, choiceId);
        const yPos = squareDimension * this.getChoiceIndex(lunchOptions, choiceId);

        return {
          person,
          xPos,
          yPos,
        };
      });

    const previousDaysLunchOptions = [...lunchOptions, { id: '23', name: 'zzzzz'}];
    const autoSuggestOptions = difference(previousDaysLunchOptions, lunchOptions);

    return (
      <div className="LunchPicker container">
        <div className="LunchOptions">
          {lunchOptions.map(({id, name}) =>
            <LunchOption optionName={name}
                         choiceCount={18}
                         key={id}
                         onChosen={this.onOptionSelected.bind(this, id)} />
          )}
          <Measure whitelist={['height']} onMeasure={ (dimensions) => this.setState({ squareDimension: dimensions.height }) }>
            <OptionAdder
              user={user}
              lunchOptions={autoSuggestOptions}
              isAdding={enteringNewOption}
              optionName={optionName}
              {...bindActionCreators(LunchActionCreators, dispatch)} />
          </Measure>
        </div>
        <div className="PeopleChoices">
          {choices.map(({ person, xPos, yPos }) =>
            <Motion key={person.id} style={{person, xPos: spring(xPos), yPos: spring(yPos)}}>
              {(interpolatedChoice) =>
                <PersonSquare person={person} style={{
                  transform: `translate3d(${interpolatedChoice.xPos}px, ${interpolatedChoice.yPos}px, 0)`,
                  zIndex: interpolatedChoice.yPos,
                }} />
              }
            </Motion>
          )}
        </div>
      </div>
    );
  }
}

export default LunchPicker;
