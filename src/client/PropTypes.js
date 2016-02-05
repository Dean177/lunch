import { PropTypes } from 'react';

export const Auth = PropTypes.shape({
  hasAuthorizedSplitwiseToken: PropTypes.bool,
  isAttemptingSplitwiseAuthentication: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  splitwiseAuthorizationToken: PropTypes.string,
});

export const LunchOption = PropTypes.shape({
  id: PropTypes.string.isRequired,
  lastChosen: PropTypes.number,
  name: PropTypes.string,
});

export const Person = PropTypes.shape({
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
});

export const PersonChoice = PropTypes.shape({
  lunchOptionId: PropTypes.string,
  dateChosen: PropTypes.number,
  isFetching: PropTypes.bool,
  orderDetails: PropTypes.string,
  paymentAmount: PropTypes.string,
  person: Person.isRequired,
});
