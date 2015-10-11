import createStateMergeReducer from '../util/createStateMergeReducer';
import { ChangeName } from '../../shared/constants/actionTypes';

const initialState = {
  id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
  name: `User${(Math.random() * 100).toFixed()}`,
};

const lunchReducer = createStateMergeReducer(initialState, {
  [ChangeName](state, { payload: { name } }) {
    return { name };
  },
});

export default lunchReducer;
