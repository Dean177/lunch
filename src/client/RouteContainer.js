import React, { Component, PropTypes } from 'react';

class RouteContainer extends Component {
  render() {
    return (<div>{this.props.children}</div>);
  }
}

RouteContainer.propTypes = {
  children: PropTypes.node,
};

export default RouteContainer;
