import { AddLunchOption, ChangeImageUrl, ChangeName, UserLunchChoice } from '../../shared/constants/actionTypes';
import onAddLunchOption from './onAddLunchOption';
import onChangeName from './onChangeName';
import onUserLunchChoice from './onUserLunchChoice';
import onChangeImageUrl from './onChangeImageUrl';

const actionHandlers = {
  [AddLunchOption]: onAddLunchOption,
  [ChangeImageUrl]: onChangeImageUrl,
  [ChangeName]: onChangeName,
  [UserLunchChoice]: onUserLunchChoice,
};

export default actionHandlers;
