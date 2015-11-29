import createLocalStorageMergeReducer from '../util/createLocalStorageMergeReducer';
import { ChangeName, ChangeImageUrl } from '../../shared/constants/actionTypes';
import * as uuid from 'node-uuid';


interface UserReducerState {
  id: string;
  name: string;
  imageUrl: string;
}

const initialState: UserReducerState = {
  id: uuid.v4(),
  name: `User${(Math.random() * 100).toFixed()}`,
  imageUrl: '',
};

const createUserReducer = createLocalStorageMergeReducer('lunchUser', initialState, {
  [ChangeName](state, { payload: { name } }) {
    return { name };
  },

  [ChangeImageUrl](state, { payload: { url }}) {
    return { imageUrl: url };
  },
});

export default createUserReducer;
