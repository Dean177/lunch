import { AddLunchOption, ChangeImageUrl, ChangeName, ChangeOrderDetails, UserLunchChoice, OfferToGetLunch } from '../../shared/constants/actionTypes';
import onAddLunchOption from './onAddLunchOption';
import onChangeImageUrl from './onChangeImageUrl';
import onChangeName from './onChangeName';
import onChangeOrderDetails from './onChangeOrderDetails';
import onUserLunchChoice from './onUserLunchChoice';
import onOfferToGetLunch from './onOfferToGetLunch';

const actionHandlers = {
  [AddLunchOption]: onAddLunchOption,
  [ChangeImageUrl]: onChangeImageUrl,
  [ChangeName]: onChangeName,
  [ChangeOrderDetails]: onChangeOrderDetails,
  [UserLunchChoice]: onUserLunchChoice,
  [OfferToGetLunch]: onOfferToGetLunch
};

export default actionHandlers;
