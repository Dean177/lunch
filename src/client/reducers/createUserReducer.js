import createLocalStorageMergeReducer from '../util/createLocalStorageMergeReducer';
import { ChangeName, ChangeImageUrl } from '../../shared/constants/actionTypes/userActionTypess';
import { v4 as uuid } from 'node-uuid';

const initialState = {
  id: uuid(),
  name: `User${(Math.random() * 100).toFixed()}`,
  imageUrl: '',
};

const createUserReducer = createLocalStorageMergeReducer('lunchUser', initialState, {
  [ChangeName](state, { payload: { name } }) {
    return { name };
  },

  [ChangeImageUrl](state, { payload: { url } }) {
    return { imageUrl: url };
  },
});

export default createUserReducer;
