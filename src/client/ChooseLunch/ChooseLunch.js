import React, { Component } from 'react';
import { find } from 'underscore';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { changeOrderDetails, goneToFetchLunch, offerToGetLunch, toggleNewOption, addLunchOption, chooseLunchOption, enterOptionName } from '../actionCreators/lunchActionCreators';
import LunchPicker from '../LunchPicker';
import Sidebar from '../components/Sidebar';


@connect(appState => {
  const userLunchChoice = find(
    appState.lunch.peopleChoices,
    (personChoice) => (personChoice.person.id === appState.user.id)
  );

  return {
    user: appState.user,
    userLunchChoice,
    enteringNewOption: appState.lunch.enteringNewOption,
    optionName: appState.lunch.optionName,
    selectedOptionId: appState.lunch.selectedOptionId,
    lunchOptions: appState.lunch.lunchOptions,
    peopleChoices: appState.lunch.peopleChoices,
  };
})
class ChooseLunch extends Component {
  render() {
    const {
      enteringNewOption,
      optionName,
      dispatch,
      peopleChoices,
      userLunchChoice,
      user,
      lunchOptions,
    } = this.props;
    return (
      <div className='ChooseLunch'>
        <Link to='/user' className='main-nav-link'>
          <i className='fa fa-bars' />
        </Link>
        <div className='lunch-body'>
          <LunchPicker
            user={user}
            enteringNewOption={enteringNewOption}
            optionName={optionName}
            lunchOptions={lunchOptions}
            peopleChoices={peopleChoices}
            {...bindActionCreators({ toggleNewOption, addLunchOption, chooseLunchOption, enterOptionName }, dispatch)}
          />
          <Sidebar
            userLunchChoice={userLunchChoice}
            peopleChoices={peopleChoices}
            {...bindActionCreators({ changeOrderDetails, goneToFetchLunch, offerToGetLunch }, dispatch)} />
        </div>
      </div>
    );
  }
}

export default ChooseLunch;
