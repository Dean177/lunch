import React, { Component, PropTypes } from 'react';
import { Person, LunchOption, PersonChoice } from '../PropTypes';
import { Link } from 'react-router';
import LunchPicker from '../components/LunchPicker';
import Sidebar from '../components/Sidebar';

class ChooseLunch extends Component {
  static propTypes = {
    enteringNewOption: PropTypes.bool,
    hasAuthorizedSplitwiseToken: PropTypes.bool.isRequired,
    lunchOptions: PropTypes.arrayOf(LunchOption),
    optionName: PropTypes.string,
    peopleChoices: PropTypes.arrayOf(PersonChoice),
    selectedOptionId: PropTypes.string,
    user: Person,
    userLunchChoice: PersonChoice,

    addLunchOption: PropTypes.func,
    changeOrderDetails: PropTypes.func,
    chooseLunchOption: PropTypes.func,
    enterOptionName: PropTypes.func,
    goneToFetchLunch: PropTypes.func,
    notGettingLunch: PropTypes.func,
    offerToGetLunch: PropTypes.func,
    toggleNewOption: PropTypes.func,
    updatePaymentAmount: PropTypes.func,
  };

  render() {
    const {
      enteringNewOption,
      hasAuthorizedSplitwiseToken,
      lunchOptions,
      optionName,
      peopleChoices,
      user,
      userLunchChoice,
    } = this.props;

    const {
      addLunchOption,
      changeOrderDetails,
      chooseLunchOption,
      enterOptionName,
      goneToFetchLunch,
      notGettingLunch,
      offerToGetLunch,
      toggleNewOption,
      updatePaymentAmount,
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
            { ...{
              addLunchOption,
              chooseLunchOption,
              enterOptionName,
              toggleNewOption,
            } }
          />
          <Sidebar
            hasAuthorizedSplitwiseToken={hasAuthorizedSplitwiseToken}
            peopleChoices={peopleChoices}
            user={user}
            userLunchChoice={userLunchChoice}
            { ...{
              changeOrderDetails,
              goneToFetchLunch,
              offerToGetLunch,
              notGettingLunch,
              updatePaymentAmount,
            } }
          />
        </div>
      </div>
    );
  }
}

export default ChooseLunch;
