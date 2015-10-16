import './LunchPicker.scss';
import React, { Component, PropTypes } from 'react';
import Measure from 'react-measure';
import { Motion, spring } from 'react-motion';
import { bindActionCreators } from 'redux';
import * as LunchActionCreators from '../actionCreators/lunchActionCreators';
import OptionAdder from './OptionAdder';
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
    buttonWidth: 0,
    columnDimensions: {
      width: 0,
      height: 0,
    },
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

    const {
      buttonWidth,
      columnDimensions,
    } = this.state;

    const choices = peopleChoices
      .filter(({choiceId}) => !!choiceId)
      .map(({ person, choiceId }) => {
        const xPos = columnDimensions.width * this.getChoiceIndex(lunchOptions, choiceId);
        const yPos = (columnDimensions.height + 15) * this.getChooserCount(peopleChoices, person.id, choiceId);

        return {
          id: person.id,
          name: person.name,
          xPos,
          yPos,
        };
      });

    const previousDaysLunchOptions = [...lunchOptions, { id: '23', name: 'zzzzz'}];
    const autoSuggestOptions = difference(previousDaysLunchOptions, lunchOptions);

    return (
      <div className="LunchPicker">
        <div className="OptionColumns">
          {lunchOptions.map(({id, name}) =>
            <div className="OptionColumn" key={id} onClick={this.onOptionSelected.bind(this, id)}>
              <button className="btn btn-primary" type="button">{ name }</button>
            </div>
          )}
          <Measure whitelist={['width', 'height']} onChange={ (dimensions) => this.setState({ columnDimensions: dimensions }) }>
            <div className="OptionColumn">
              <Measure whitelist={['width']} onChange={ ({ width }) => this.setState({ buttonWidth: width }) }>
                <OptionAdder
                  user={user}
                  lunchOptions={autoSuggestOptions}
                  isAdding={enteringNewOption}
                  optionName={optionName}
                  {...bindActionCreators(LunchActionCreators, dispatch)} />
              </Measure>
            </div>
          </Measure>
        </div>
        <div className="PeopleChoices">
          {choices.map(({ id, name, xPos, yPos }) =>
            <Motion key={id} style={{id, name, xPos: spring(xPos), yPos: spring(yPos)}}>
              {(interpolatedChoice) =>
                <div className="PersonChoice" style={{
                  width: buttonWidth,
                  transform: `translate3d(${interpolatedChoice.xPos}px, ${interpolatedChoice.yPos}px, 0)`,
                  zIndex: interpolatedChoice.yPos,
                }}>
                  {name}
                </div>
              }
            </Motion>
          )}
        </div>
      </div>
    );
  }
}

export default LunchPicker;
