import createLocalStorageMergeReducer from '../util/createLocalStorageMergeReducer';
import { ChangeName, ChangeImageUrl } from '../../shared/constants/actionTypes/userActionTypes';
import { v4 as uuid } from 'node-uuid';

const initialState = {
  id: uuid(),
  name: `User${(Math.random() * 100).toFixed()}`,
  imageUrl: '',
};

const createUserReducer = createLocalStorageMergeReducer('lunchUser', initialState, {
  [ChangeImageUrl](state, { payload }) {
    const { id } = state;
    const updatedUserId = payload.id;

    return (id === updatedUserId) ? { imageUrl: payload.url } : state;
  },

  [ChangeName](state, { payload }) {
    const { id } = state;
    const updatedUserId = payload.id;

    return (id === updatedUserId) ? { name: payload.name } : state;
  },
});

export default createUserReducer;
