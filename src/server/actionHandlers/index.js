import * as aTypes from '../../shared/constants/actionTypes';
import onAddLunchOption from './onAddLunchOption';
import onChangeImageUrl from './onChangeImageUrl';
import onChangeName from './onChangeName';
import onChangeOrderDetails from './onChangeOrderDetails';
import onChangePaymentAmount from './onChangePaymentAmount';
import onUserLunchChoice from './onUserLunchChoice';
import onOfferToGetLunch from './onOfferToGetLunch';

const actionHandlers = {
  [aTypes.AddLunchOption]: onAddLunchOption,
  [aTypes.ChangeImageUrl]: onChangeImageUrl,
  [aTypes.ChangeName]: onChangeName,
  [aTypes.ChangeOrderDetails]: onChangeOrderDetails,
  [aTypes.EnterPaymentAmount]: onChangePaymentAmount,
  [aTypes.UserLunchChoice]: onUserLunchChoice,
  [aTypes.OfferToGetLunch]: onOfferToGetLunch,
};

export default actionHandlers;
