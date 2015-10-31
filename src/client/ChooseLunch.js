import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LunchPicker from './LunchPicker/LunchPicker';

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
  };
})
class ChooseLunch extends Component {
  render() {
    return (
      <div className="ChooseLunch">
        <Link to="/user" className="main-nav-link">
          <i className="fa fa-bars" />
        </Link>
        <LunchPicker {...this.props} />
      </div>
    );
  }
}

export default ChooseLunch;
