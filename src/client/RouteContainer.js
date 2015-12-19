import React, { PropTypes } from 'react';

//{props.children}
const RouteContainer = (props) => (
  <div>
    <h1>Routes</h1>

  </div>
);

RouteContainer.propTypes = {
  children: PropTypes.node,
};

export default RouteContainer;
