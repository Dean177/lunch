import React, { PropTypes } from 'react';

const RouteContainer = (props) => <div>{props.children}</div>;

RouteContainer.propTypes = {
  children: PropTypes.node,
};

export default RouteContainer;
