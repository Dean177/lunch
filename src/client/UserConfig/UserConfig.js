import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Auth, Person } from '../PropTypes';
import { changeName, changeImageUrl } from '../../shared/actionCreators/userActionCreator';
import { splitwiseAuthAttempt } from '../../shared/actionCreators/authActionCreator';
import PersonSquare from '../components/PersonSquare';
import SplitwiseAuthorizer from './components/SplitwiseAuthorizer';


@connect(appState => ({
  auth: appState.auth,
  user: appState.user,
}))
class LunchPicker extends Component {
  static propTypes = {
    auth: Auth.isRequired,
    user: Person.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  onSubmit = (event) => {
    event.preventDefault();
  };

  onImageChange = (event) => {
    this.props.dispatch(changeImageUrl(this.props.user.id, event.target.value));
  };

  onNameChange = (event) => {
    this.props.dispatch(changeName(this.props.user.id, event.target.value));
  };

  render() {
    const { auth, user } = this.props;

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
              <input onChange={this.onNameChange} value={user.name} type='text' className='form-control' />
            </div>

            <div className='form-group'>
              <label>Image Url</label>
              <div className='profile-image'>
                <PersonSquare person={user} />
                <input onChange={this.onImageChange} value={user.imageUrl} type='text' className='form-control url-input' />
              </div>
            </div>

            <div className='form-group'>
              <SplitwiseAuthorizer
                authorizationLink={auth.splitwiseAuthorizationLink}
                attemptSplitwiseAuth={bindActionCreators(splitwiseAuthAttempt, this.props.dispatch)}
                authFailureMessage={auth.splitwiseAuthFailureMessage}
                isAuthorized={auth.hasAuthorizedSplitwiseToken}
                isAuthorizing={auth.isAttemptingSplitwiseAuthentication}
              />
            </div>
            <pre>{JSON.stringify(auth, null, 2)}</pre>
          </form>
        </div>
      </div>
    );
  }
}

export default LunchPicker;
