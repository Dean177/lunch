import AuthApi from 'splitwise-node';
const dBug = require('debug')('lunch:getSplitwiseAuthApi');

const Key = process.env.SPLITWISE_CONSUMER_KEY;
const Secret = process.env.SPLITWISE_CONSUMER_SECRET;
if (Key == null || Secret == null) {
  dBug('Environment did not provide splitwise api key & secret');
}

export default function getSplitwiseAuthApi() {
  return new AuthApi(Key, Secret);
}

export const getSplitwiseUserApi = (UserToken, UserSecret) => {
  return new AuthApi(Key, Secret).getSplitwiseApi(UserToken, UserSecret);
};
