import React, { Component, PropTypes } from 'react';
import { Person, LunchOption, PersonChoice } from '../PropTypes';
import { find } from 'underscore';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import {
  addLunchOption,
  changeOrderDetails,
  chooseLunchOption,
  enterOptionName,
  enterPaymentAmount,
  goneToFetchLunch,
  notGettingLunch,
  offerToGetLunch,
  toggleNewOption,
} from '../../shared/actionCreators/lunchActionCreators';
import LunchPicker from '../components/LunchPicker';
import Sidebar from '../components/Sidebar';


@connect(appState => {
  const userLunchChoice = find(
    appState.lunch.peopleChoices,
    (personChoice) => (personChoice.person.id === appState.user.id)
  );

  return {
    enteringNewOption: appState.lunch.enteringNewOption,
    hasAuthorizedSplitwiseToken: appState.auth.hasAuthorizedSplitwiseToken,
    lunchOptions: appState.lunch.lunchOptions,
    optionName: appState.lunch.optionName,
    peopleChoices: appState.lunch.peopleChoices,
    selectedOptionId: appState.lunch.selectedOptionId,
    user: appState.user,
    userLunchChoice,
  };
})
class ChooseLunch extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    enteringNewOption: PropTypes.bool,
    hasAuthorizedSplitwiseToken: PropTypes.bool.isRequired,
    lunchOptions: PropTypes.arrayOf(LunchOption),
    optionName: PropTypes.string,
    peopleChoices: PropTypes.arrayOf(PersonChoice),
    selectedOptionId: PropTypes.string,
    user: Person,
    userLunchChoice: PersonChoice,
  };

  render() {
    const {
      dispatch,
      enteringNewOption,
      hasAuthorizedSplitwiseToken,
      lunchOptions,
      optionName,
      peopleChoices,
      user,
      userLunchChoice,
    } = this.props;
    return (
      <div className='ChooseLunch'>
        <Link to='/user' className='main-nav-link'>
          <i className='fa fa-bars' />
        </Link>
        <div className='lunch-body'>
          <LunchPicker
            enteringNewOption={enteringNewOption}
            lunchOptions={lunchOptions}
            optionName={optionName}
            peopleChoices={peopleChoices}
            user={user}
            {...bindActionCreators({ addLunchOption, chooseLunchOption, enterOptionName, toggleNewOption }, dispatch)}
          />
          <Sidebar
            hasAuthorizedSplitwiseToken={hasAuthorizedSplitwiseToken}
            peopleChoices={peopleChoices}
            userLunchChoice={userLunchChoice}
            {...bindActionCreators(
              {
                changeOrderDetails,
                enterPaymentAmount,
                goneToFetchLunch,
                notGettingLunch,
                offerToGetLunch,
              },
              dispatch
            )}
          />
        </div>
      </div>
    );
  }
}

export default ChooseLunch;
