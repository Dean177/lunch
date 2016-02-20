import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Person } from '../../PropTypes';

function PersonSquare(props) {
  const { person, isFetching } = props;
  const url = person.imageUrl || 'http://png-4.findicons.com/files/icons/2770/ios_7_icons/512/user_male.png';
  return (
    <img {...props}
      className={classNames('PersonSquare', { isFetching: !!isFetching })}
      alt={person.name}
      title={person.name}
      src={url}
    />
  );
}

PersonSquare.propTypes = {
  person: Person.isRequired,
  isFetching: PropTypes.bool,
};

export default PersonSquare;
