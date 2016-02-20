import './ChooseLunch.scss';
import { connect } from 'react-redux';
import { compose, find } from 'underscore';
import ChooseLunch from './ChooseLunch.js';
import {
  addLunchOption,
  changeOrderDetails,
  chooseLunchOption,
  enterOptionName,
  updatePaymentAmount,
  goneToFetchLunch,
  notGettingLunch,
  offerToGetLunch,
  toggleNewOption,
} from '../../shared/actionCreators/lunchActionCreators';

const mapStateToProps = (appState) => {
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
};

const mapDispatchToProps = (dispatch) => ({
  addLunchOption: compose(dispatch, addLunchOption),
  changeOrderDetails: compose(dispatch, changeOrderDetails),
  chooseLunchOption: compose(dispatch, chooseLunchOption),
  enterOptionName: compose(dispatch, enterOptionName),
  goneToFetchLunch: compose(dispatch, goneToFetchLunch),
  notGettingLunch: compose(dispatch, notGettingLunch),
  offerToGetLunch: compose(dispatch, offerToGetLunch),
  toggleNewOption: compose(dispatch, toggleNewOption),
  updatePaymentAmount: compose(dispatch, updatePaymentAmount),
});

const ConnectedChooseLunch = connect(mapStateToProps, mapDispatchToProps)(ChooseLunch);

export default ConnectedChooseLunch;
