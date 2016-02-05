import React, { Component, PropTypes } from 'react';
import { Person, PersonChoice, LunchOption as LunchOptProp } from '../../PropTypes';
const Measure = require('react-measure');
import { Motion, spring } from 'react-motion';
import OptionAdder from '../OptionAdder';
import LunchOption from '../LunchOption';
import PersonSquare from '../PersonSquare';
import { difference } from 'underscore';

export default class LunchPicker extends Component {
  static propTypes = {
    addLunchOption: PropTypes.func.isRequired,
    chooseLunchOption: PropTypes.func.isRequired,
    enteringNewOption: PropTypes.bool.isRequired,
    enterOptionName: PropTypes.func.isRequired,
    lunchOptions: PropTypes.arrayOf(LunchOptProp).isRequired,
    optionName: PropTypes.string.isRequired,
    peopleChoices: PropTypes.arrayOf(PersonChoice).isRequired,
    toggleNewOption: PropTypes.func.isRequired,
    user: Person.isRequired,
  };

  state = { squareDimension: 0 };

  onOptionSelected(lunchOptionId) {
    this.props.chooseLunchOption(this.props.user, lunchOptionId);
  }

  getChooserCount(peopleChoices, personId, userlunchOptionId) {
    return peopleChoices
      .filter(({ lunchOptionId }) => (lunchOptionId === userlunchOptionId))
      .map(({ person }) => (person.id))
      .indexOf(personId);
  }

  getChoiceIndex(lunchOptions, lunchOptionId) {
    return lunchOptions
      .map(({ id }) => (id))
      .indexOf(lunchOptionId);
  }

  lunchOptionsWithCountChosen(lunchOptions, peopleChoices) {
    return lunchOptions.map((lunchOption) => {
      const chosenCount = peopleChoices
        .filter(({ lunchOptionId }) => (lunchOptionId === lunchOption.id))
        .length;

      return { ...lunchOption, chosenCount };
    });
  }

  peopleChoicesWithCoordinates(lunchOptions, peopleChoices, squareDimension) {
    return peopleChoices
      .filter(({ lunchOptionId }) => !!lunchOptionId)
      .map((personChoice) => {
        const { person, lunchOptionId } = personChoice;
        const xPos = squareDimension * this.getChooserCount(peopleChoices, person.id, lunchOptionId);
        const yPos = squareDimension * this.getChoiceIndex(lunchOptions, lunchOptionId);

        return {
          ...personChoice,
          xPos,
          yPos,
        };
      });
  }

  render() {
    const {
      enteringNewOption,
      optionName,
      peopleChoices,
      lunchOptions,
      user,
      toggleNewOption,
      addLunchOption,
      enterOptionName,
    } = this.props;

    const lunchOptionsWithCountChosen = this.lunchOptionsWithCountChosen(lunchOptions, peopleChoices);
    const choices = this.peopleChoicesWithCoordinates(lunchOptions, peopleChoices, this.state.squareDimension);

    const previousDaysLunchOptions = [...lunchOptions, { id: '23', name: 'zzzzz' }]; // TODO
    const autoSuggestOptions = difference(previousDaysLunchOptions, lunchOptions);

    return (
      <div className='LunchPicker'>
        <div className='LunchOptions'>
          {lunchOptionsWithCountChosen.map(({ id, name, chosenCount }) =>
            <LunchOption optionName={name}
                         chosenCount={chosenCount}
                         key={id}
                         onChosen={this.onOptionSelected.bind(this, id)} />
          )}
          <Measure whitelist={['height']} onMeasure={(dimensions) => this.setState({ squareDimension: dimensions.height })} >
            <OptionAdder
              user={user}
              lunchOptions={autoSuggestOptions}
              isAdding={enteringNewOption}
              optionName={optionName}
              { ...{ toggleNewOption, addLunchOption, enterOptionName } }
            />
          </Measure>
        </div>
        <div className='PeopleChoices'>
          {choices.map(({ person, isFetching, xPos, yPos }) =>
            <Motion key={person.id} style={{ person, xPos: spring(xPos), yPos: spring(yPos) }}>
              {(interpolatedChoice) =>
                <PersonSquare person={person} isFetching={isFetching} style={{
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
