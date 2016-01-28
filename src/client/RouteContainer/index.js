import './RouteContainer.scss';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LoadingScreen from './LoadingScreen';


function RouteContainer(props) {
  const { isAuthenticated } = props.auth;
  return (
    <div>
      <ReactCSSTransitionGroup transitionName='slide-up' transitionEnterTimeout={0} transitionLeaveTimeout={500}>
        {!isAuthenticated ? <LoadingScreen key='loading-screen'/> : null}
      </ReactCSSTransitionGroup>
      <div>{props.children}</div>
    </div>
  );
}

RouteContainer.propTypes = {
  children: PropTypes.node,
  auth: PropTypes.object,
};

export default connect(state => ({ auth: state.auth }))(RouteContainer);
