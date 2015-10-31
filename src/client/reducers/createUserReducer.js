import createLocalStorageMergeReducer from '../util/createLocalStorageMergeReducer';
import { ChangeName, ChangeImageUrl } from '../../shared/constants/actionTypes';
import { v4 as uuid } from 'node-uuid';

const initialState = {
  id: uuid(),
  name: `User${(Math.random() * 100).toFixed()}`,
  url: 'http://lh6.ggpht.com/s_VyyVsph5meqhCeEGjTCM1cbzTfWr6rUpQmINYrktB18aHES2QQ7LxD6QrvPA-7i_glG54dQRCvUBFYT38SVDAO=s800',
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
