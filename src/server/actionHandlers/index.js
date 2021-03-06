import * as authTypes from '../../shared/constants/actionTypes/authActionTypes';
import * as lunchTypes from '../../shared/constants/actionTypes/lunchActionTypes';
import * as userTypes from '../../shared/constants/actionTypes/userActionTypes';
import onAddLunchOption from './onAddLunchOption';
import onAuthenticateUser from './onAuthenticateUser';
import onChangeImageUrl from './onChangeImageUrl';
import onChangeName from './onChangeName';
import onChangeOrderDetails from './onChangeOrderDetails';
import onChangePaymentAmount from './onChangePaymentAmount';
import onGoneToFetchLunch from './onGoneToFetchLunch';
import onNotGettingLunch from './onNotGettingLunch';
import onOfferToGetLunch from './onOfferToGetLunch';
import onSplitwiseAuth from './onSplitwiseAuth';
import onUserLunchChoice from './onUserLunchChoice';

const LunchOptionRepo = require('../repository/LunchOptionRepo');
const PersonChoiceRepo = require('../repository/PersonChoiceRepo');

module.exports = {
  [authTypes.Authenticate]: onAuthenticateUser,
  [authTypes.SplitwiseAuth]: onSplitwiseAuth,
  [lunchTypes.AddLunchOption]: onAddLunchOption(LunchOptionRepo, PersonChoiceRepo),
  [userTypes.ChangeImageUrl]: onChangeImageUrl,
  [userTypes.ChangeName]: onChangeName,
  [lunchTypes.ChangeOrderDetails]: onChangeOrderDetails,
  [lunchTypes.UpdatePaymentAmount]: onChangePaymentAmount,
  [lunchTypes.GoneToFetchLunch]: onGoneToFetchLunch,
  [lunchTypes.UserLunchChoice]: onUserLunchChoice,
  [lunchTypes.NotGettingLunch]: onNotGettingLunch,
  [lunchTypes.OfferToGetLunch]: onOfferToGetLunch,
};
