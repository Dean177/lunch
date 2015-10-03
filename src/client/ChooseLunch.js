import './ChooseLunch.scss';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LunchActionCreators from './actionCreators/lunchActionCreators';
import LunchPicker from './LunchPicker/LunchPicker'

@connect(appState => {
  const {
    enteringNewOption,
    optionName,
    selectedOptionId,
    lunchOptions,
    peopleChoices,
  } = appState.lunch;

  return {
    user: appState.user,
    enteringNewOption,
    optionName,
    selectedOptionId,
    lunchOptions,
    peopleChoices,
  }
})
class ChooseLunch extends Component {
  render() {
    return (
      <div className="ChooseLunch container">
        <h2>Lunchtime</h2>
        <LunchPicker {...this.props}/>
      </div>
    );
  }
}

export default ChooseLunch;
