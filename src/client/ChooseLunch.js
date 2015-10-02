import './ChooseLunch.scss';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LunchActionCreators from './actionCreators/lunchActionCreators';
import OptionAdder from './OptionAdder/OptionAdder';
import { Spring } from 'react-motion';
import Measure from 'react-measure';

@connect(appState => appState.lunch)
class Landing extends Component {

  static propTypes = {
    enteringNewOption: PropTypes.bool,
    optionName: PropTypes.string,
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

  getChooserCount(peopleChoices, personId, choiceId) {
    return peopleChoices
      .filter(({ person, choice }) => (choice.id === choiceId))
      .map(({person, choice}) => (person.id))
      .indexOf(personId);
  }

  getChoiceIndex(lunchOptions, choiceId) {
    return lunchOptions
      .map(({ id }) => (id))
      .indexOf(choiceId);
  };

  onOptionSelected(id) {
    this.props.dispatch(LunchActionCreators.chooseLunchOption(id));
  }

  render() {
    const {
      enteringNewOption,
      selectedOptionId,
      optionName,
      peopleChoices,
      lunchOptions,
      dispatch,
    } = this.props;

    const userChoice = { person: { id: 999, name: 'ME'}, choice: { id: selectedOptionId }};
    const peopleChoicesWithUserChoice = [userChoice, ...peopleChoices];

    const {
      buttonWidth,
      columnDimensions: {
        width,
        height,
      },
    } = this.state;

    const choices = {
      choices: peopleChoicesWithUserChoice.map(({ person, choice }) => {
        const xPos = width * this.getChoiceIndex(lunchOptions, choice.id);
        const yPos = height * this.getChooserCount(peopleChoicesWithUserChoice, person.id, choice.id);

        return {
          id: person.id,
          name: person.name,
          xPos: {val: xPos},
          yPos: {val: yPos},
        };
      })
    };

    const lunchOptionColumns = lunchOptions.map(({id, name}) => {
      return (
        <div className="OptionColumn" key={id} onClick={this.onOptionSelected.bind(this, id)}>
          <button className="btn btn-primary" type="button">{ name }</button>
        </div>
      );
    });

    return (
      <div className="ChooseLunch container">
        <h2>Lunchtime</h2>
        <div className="LunchPicker">
          <div className="OptionColumns">
            {lunchOptionColumns}
            <Measure whitelist={['width', 'height']} onChange={ (columnDimensions) =>  this.setState({ columnDimensions }) }>
              <div className="OptionColumn">
                <Measure whitelist={['width', 'height']} onChange={ ({ width }) =>  this.setState({ buttonWidth: width }) }>
                  <OptionAdder
                    isAdding={enteringNewOption}
                    optionName={optionName}
                    {...bindActionCreators(LunchActionCreators, dispatch)} />
                </Measure>
              </div>
            </Measure>
          </div>
          <Spring endValue={choices}>
            {({ choices: currentChoices }) =>
              <div className="PeopleChoices">
                {currentChoices.map(({ id, name, xPos, yPos}) =>
                  <div key={id} className="PersonChoice" style={{
                      width: buttonWidth,
                      paddingRight: '1em',
                      transform: `translate3d(${xPos.val}px, ${yPos.val}px, 0)`,
                    }}
                  >{name}</div>
                )}
              </div>
            }
          </Spring>
        </div>
      </div>
    );
  }
}

export default Landing;
