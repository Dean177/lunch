import React from 'react';
import PersonSquare from '../../PersonSquare';
import { PersonChoice } from '../../../PropTypes';

function getOrderText(isFetching, hasOrderDetails) {
  if (isFetching) {
    return 'is fetching';
  } else if (hasOrderDetails) {
    return 'wants:';
  }

  return '';
}

function PersonOrder({ personChoice: { person, orderDetails, isFetching } }) {
  return (
    <div className='PersonOrder' key={person.id}>
      <PersonSquare person={person} />
      <div className='main'>
        <p className='title'>{person.name} {getOrderText(isFetching, orderDetails)}</p>
        <pre className='description'>{orderDetails}</pre>
      </div>
    </div>
  );
}

PersonOrder.propTypes = { personChoice: PersonChoice.isRequired };

export default PersonOrder;
