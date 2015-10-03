import './LunchPicker.scss';
import React, { Component, PropTypes } from 'react';
import Measure from 'react-measure';
import { Spring } from 'react-motion';
import { bindActionCreators } from 'redux';
import * as LunchActionCreators from '../actionCreators/lunchActionCreators';
import OptionAdder from './OptionAdder';

class LunchPicker extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    enteringNewOption: PropTypes.bool.isRequired,
    optionName: PropTypes.string.isRequired,
    selectedOptionId: PropTypes.node.isRequired,
    lunchOptions: PropTypes.array,
    peopleChoices: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    buttonWidth: 0,
    columnDimensions: {
      width: 0,
      height: 0,
    },
  };

  onOptionSelected(id) {
    this.props.dispatch(LunchActionCreators.chooseLunchOption(id));
  }

  getChooserCount(peopleChoices, personId, userChoiceId) {
    return peopleChoices
      .filter(({ person, choiceId }) => (choiceId === userChoiceId))
      .map(({ person }) => (person.id))
      .indexOf(personId);
  }

  getChoiceIndex(lunchOptions, choiceId) {
    return lunchOptions
      .map(({ id }) => (id))
      .indexOf(choiceId);
  };


  render() {
    const {
      user,
      enteringNewOption,
      selectedOptionId,
      optionName,
      peopleChoices,
      lunchOptions,
      dispatch,
      } = this.props;

    const userChoice = { person: user, choiceId: selectedOptionId };
    const peopleChoicesWithUserChoice = [userChoice, ...peopleChoices];

    const {
      buttonWidth,
      columnDimensions: {
        width,
        height,
      },
    } = this.state;

    const choices = {
      choices: peopleChoicesWithUserChoice.map(({ person, choiceId }) => {
        const xPos = width * this.getChoiceIndex(lunchOptions, choiceId);
        const yPos = (height + 15) * this.getChooserCount(peopleChoicesWithUserChoice, person.id, choiceId);

        return {
          id: person.id,
          name: person.name,
          xPos: {val: xPos},
          yPos: {val: yPos},
        };
      })
    };

    return (
      <div className="LunchPicker">
        <div className="OptionColumns">
          {lunchOptions.map(({id, name}) =>
            <div className="OptionColumn" key={id} onClick={this.onOptionSelected.bind(this, id)}>
              <button className="btn btn-primary" type="button">{ name }</button>
            </div>
          )}
          <Measure whitelist={['width', 'height']} onChange={ (columnDimensions) =>  this.setState({ columnDimensions }) }>
            <div className="OptionColumn">
              <Measure whitelist={['width']} onChange={ ({ width }) =>  this.setState({ buttonWidth: width }) }>
                <OptionAdder
                  isAdding={enteringNewOption}
                  optionName={optionName}
                  {...bindActionCreators(LunchActionCreators, dispatch)} />
              </Measure>
            </div>
          </Measure>
        </div>

        <Spring endValue={choices}>
          {
            ({ choices: currentChoices }) =>
              <div className="PeopleChoices">
                {currentChoices.map(({ id, name, xPos, yPos}) =>
                  <div key={id}
                       className="PersonChoice"
                       style={{
                          width: buttonWidth,
                          transform: `translate3d(${xPos.val}px, ${yPos.val}px, 0)`,
                          zIndex: yPos,
                        }}>
                    {name}
                  </div>
                )}
              </div>
          }
        </Spring>
      </div>
    );
  }
}

export default LunchPicker;
