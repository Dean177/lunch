import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Auth, Person } from '../PropTypes';
import PersonSquare from '../components/PersonSquare';
import SplitwiseAuthorizer from './components/SplitwiseAuthorizer';


class LunchPicker extends Component {
  static propTypes = {
    auth: Auth.isRequired,
    user: Person.isRequired,
    changeImageUrl: PropTypes.func.isRequired,
    changeName: PropTypes.func.isRequired,
    navigateToRoute: PropTypes.func.isRequired,
    splitwiseAuthAttempt: PropTypes.func.isRequired,
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.navigateToRoute('/lunch');
  };

  onImageChange = (event) => {
    this.props.changeImageUrl(this.props.user.id, event.target.value);
  };

  onNameChange = (event) => {
    this.props.changeName(this.props.user.id, event.target.value);
  };

  render() {
    const { auth, user, splitwiseAuthAttempt } = this.props;

    return (
      <div className='UserConfig'>
        <Link to='/lunch' className='main-nav-link'>
          <i className='fa fa-square-o' />
        </Link>

        <div className='container'>
          <h1>Settings</h1>

          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label>Name</label>
              <input
                onChange={this.onNameChange}
                value={user.name}
                type='text'
                className='form-control' />
            </div>

            <div className='form-group'>
              <label>Image Url</label>
              <div className='profile-image'>
                <PersonSquare person={user} />
                <input
                  onChange={this.onImageChange}
                  value={user.imageUrl}
                  type='text'
                  className='form-control url-input' />
              </div>
            </div>

            <div className='form-group'>
              <SplitwiseAuthorizer
                authorizationLink={auth.splitwiseAuthorizationLink}
                attemptSplitwiseAuth={splitwiseAuthAttempt}
                authFailureMessage={auth.splitwiseAuthFailureMessage}
                isAuthorized={auth.hasAuthorizedSplitwiseToken}
                isAuthorizing={auth.isAttemptingSplitwiseAuthentication}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LunchPicker;
