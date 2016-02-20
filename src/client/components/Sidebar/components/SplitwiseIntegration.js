import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import SplitwiseLogo from '../../SplitwiseLogo';

function SplitwiseIntegration(props) {
  return (
    <div className='SplitwiseIntegration'
         style={{ visibility: props.isAuthorized ? 'hidden' : 'visible' }}>
      <Link className='auth-link btn btn-secondary' to='/user'>
        <SplitwiseLogo />
        <span className='auth-text'>Enable splitwise integration</span>
      </Link>
    </div>
  );
}

SplitwiseIntegration.propTypes = { isAuthorized: PropTypes.bool };

export default SplitwiseIntegration;
