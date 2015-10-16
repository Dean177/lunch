import createLocalStorageMergeReducer from '../util/createLocalStorageMergeReducer';
import { ChangeName } from '../../shared/constants/actionTypes';
import { v4 as uuid } from 'node-uuid';

const initialState = {
  id: uuid(),
  name: `User${(Math.random() * 100).toFixed()}`,
};

const createUserReducer = createLocalStorageMergeReducer('lunchUser', initialState, {
  [ChangeName](state, { payload: { name } }) {
    return { name };
  },
});

export default createUserReducer;
