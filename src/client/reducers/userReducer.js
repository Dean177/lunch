import createReducer from './../util/createReducer';
import { ChangeName } from '../../shared/constants/actionTypes';

const initialState = {
  id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
  name: 'Dean',
};

const lunchReducer = createReducer(initialState, {
  [ChangeName](state, action) {
    return {
      ...state,
      name: action.name,
    };
  },
});

export default lunchReducer;
