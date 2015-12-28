import './SplitwiseAuthorizer.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import SplitwiseLogo from '../../components/SplitwiseLogo';

export default class SplitwiseAuthorizer extends Component {
  static propTypes = {
    authorizationLink: PropTypes.string.isRequired,
    attemptSplitwiseAuth: PropTypes.func.isRequired,
    authFailureMessage: PropTypes.string.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    isAuthorizing: PropTypes.bool.isRequired,
  };

  onAttemptSplitwiseAuth = (event) => {
    event.preventDefault();
    if (this.props.isAuthorizing) {
      return;
    }
    this.props.attemptSplitwiseAuth();
  };

  render() {
    const {
      authorizationLink,
      authFailureMessage,
      isAuthorized,
      isAuthorizing,
    } = this.props;


    const failureBox = (
      <div className='fail-box'>
        <h2>Authorization Failed</h2>
        <p>{authFailureMessage}</p>
      </div>
    );

    const successBox = (
      <div className='success-box'>
        <h3>Splitwise integration is active <i className='fa fa-thumbs-o-up'/></h3>
      </div>
    );

    const howToAuth = (
      <div className='steps-wrapper'>
        <ol className='how-to-steps'>
          <li>
            <p>Use the following link to authorize Lunch to access your account</p>
            <a className='btn btn-primary-outline' target='_blank' href={authorizationLink}>
              Authorize Splitwise
            </a>
          </li>
          <li>
            <p>Then click here once you have allowed lunch to access your account</p>
            <button className={classNames('btn btn-primary-outline', { 'disabled': isAuthorizing })} onClick={this.onAttemptSplitwiseAuth}>
              Confirm auth <i className={classNames({ 'fa fa-circle-o-notch fa-spin': isAuthorizing }, { 'hidden': !isAuthorizing })} />
            </button>
          </li>
        </ol>
        {authFailureMessage.length > 0 ? failureBox : ''}
      </div>
    );

    return (
      <div className='SplitwiseAuthorizer'>
        <label>Splitwise Integration</label>
        <div className='splitwise-authorizer'>
          <SplitwiseLogo />
          {isAuthorized ? successBox : howToAuth}
        </div>
      </div>
    );
  }

}
