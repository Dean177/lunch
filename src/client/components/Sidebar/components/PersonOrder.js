import React, { PropTypes } from 'react';
import PersonSquare from '../../PersonSquare';
import { PersonChoice } from '../../../PropTypes';

function PersonOrder({ personChoice: { person, orderDetails, isFetching} }) {
  return (
    <div className="PersonOrder" key={person.id}>
      <PersonSquare  person={person} />
      <div className="main">
        <p className="title">{person.name} {isFetching ? 'is fetching' : orderDetails ? 'wants:' : ''}</p>
        <pre className="description">{orderDetails}</pre>
      </div>
    </div>
  );
}

PersonOrder.propTypes = { personChoice: PersonChoice.isRequired };

export default PersonOrder;
