///<reference path="../../custom-typings/react-motion.d.ts" />
///<reference path="../../custom-typings/react-measure.d.ts" />
import {assign} from '../../shared/util/assign';
import * as React from 'react';
import Measure from 'react-measure';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import { bindActionCreators } from 'redux';
import * as LunchActionCreators from '../actionCreators/lunchActionCreators';
import {OptionAdder} from './OptionAdder';
import {LunchChoice} from './LunchChoice';
import {PersonSquare} from './../components/PersonSquare/PersonSquare';
import * as _ from 'underscore';

interface LunchPickerState {
  squareDimension: number
}

// TODO these aren't optional, but it wont render any other way!
export interface LunchPickerProps {
  dispatch?: Dispatch,
  enteringNewOption?: boolean,
  lunchOptions?: LunchOption[],
  optionName?: string,
  peopleChoices?: PersonChoice[],
  user?: Person,
}

interface PersonWithCoOrds {  person: Person; xPos: number; yPos: number; }

export class LunchPicker extends React.Component<LunchPickerProps, LunchPickerState> {
  constructor(props) {
    super(props);
    this.state = { squareDimension: 0 };
  }

  onOptionSelected = (choiceId: string) => {
    this.props.dispatch(LunchActionCreators.chooseLunchOption(this.props.user, choiceId));
  };

  getChooserCount = (peopleChoices, personId, userChoiceId) => {
    return peopleChoices
      .filter(({ choiceId }) => (choiceId === userChoiceId))
      .map(({ person }) => (person.id))
      .indexOf(personId);
  };

  getChoiceIndex = (lunchOptions, choiceId) => {
    return lunchOptions
      .map(({ id }) => (id))
      .indexOf(choiceId);
  };

  lunchOptionsWithCountChosen (lunchOptions, peopleChoices) {
    return lunchOptions.map((lunchOption) => {
      const chosenCount = peopleChoices
        .filter(({ choiceId }) => (choiceId === lunchOption.id))
        .length;

      return assign({}, lunchOption, { chosenCount });
    });
  };

  choicesWithCoordinates(lunchOptions, peopleChoices, squareDimension): Array<PersonWithCoOrds> {
    return peopleChoices
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

    const lunchOptionsWithCountChosen = this.lunchOptionsWithCountChosen(lunchOptions, peopleChoices);
    const choices = this.choicesWithCoordinates(lunchOptions, peopleChoices, this.state.squareDimension);

    return (
      <div className="LunchPicker container">
        <div className="LunchOptions">
          {lunchOptionsWithCountChosen.map(({id, name, chosenCount}) =>
            <LunchChoice optionName={name}
                         chosenCount={chosenCount}
                         key={id}
                         onChosen={this.onOptionSelected.bind(this, id)} />
          )}
          <Measure whitelist={['height']} onMeasure={ (dimensions) => this.setState({ squareDimension: dimensions.height }) }>
            <OptionAdder
              user={user}
              lunchOptions={lunchOptions}
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
