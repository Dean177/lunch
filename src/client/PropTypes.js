import { PropTypes } from 'react';

export const Person = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
});

export const PersonChoice = PropTypes.shape({
  person: Person.isRequired,
  choiceId: PropTypes.string,
  orderDetails: PropTypes.string,
  isFetching: PropTypes.bool,
  dateChosen: PropTypes.number,
});

export const LunchOption = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  lastChosen: PropTypes.number,
});
