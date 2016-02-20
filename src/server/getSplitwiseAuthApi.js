const AuthApi = require('splitwise-node');
const Key = process.env.SPLITWISE_CONSUMER_KEY;
const Secret = process.env.SPLITWISE_CONSUMER_SECRET;

export default function getSplitwiseAuthApi() {
  return new AuthApi(Key, Secret);
}

export const getSplitwiseUserApi = (UserToken, UserSecret) => (
  new AuthApi(Key, Secret).getSplitwiseApi(UserToken, UserSecret)
);
