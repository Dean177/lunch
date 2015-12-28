import React, { Component, PropTypes } from 'react';
import { Person } from '../PropTypes';
import { connect } from 'react-redux';
import { changeName, changeImageUrl } from '../actionCreators/userActionCreator';
import PersonSquare from '../components/PersonSquare';
import SplitwiseLogo from '../components/SplitwiseLogo';
import { Link } from 'react-router';


@connect(appState => ({ user: appState.user }))
class LunchPicker extends Component {
  static propTypes = {
    user: Person.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  onSubmit = (event) => {
    event.preventDefault();
  };

  onNameChange = (event) => {
    this.props.dispatch(changeName(this.props.user.id, event.target.value));
  };

  onImageChange = (event) => {
    this.props.dispatch(changeImageUrl(this.props.user.id, event.target.value));
  };

  attemptSplitwiseAuthorisation = (event) => {
    event.preventDefault();
  };

  render() {
    const { user } = this.props;
    const authorizationLink = 'https://secure.splitwise.com/authorize?oauth_token=chPGkxKhXdewW6YNdy9nK0J70dRXEYZpxPLU3fR3';

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
              <label>Splitwise Integration</label>
              <div className='splitwise-authorizer'>
                <SplitwiseLogo />
                <ol className='how-to-steps'>
                  <li>
                    <p>Use the following link to authorize Lunch to access your account</p>
                    <a className='btn btn-primary-outline' target='_blank'
                      href={authorizationLink}
                    >Authorize Splitwise</a>
                  </li>
                  <li>
                    <p>Then click here once you have allowed lunch to access your account</p>
                    <button className='btn btn-primary-outline' onClick={this.attemptSplitwiseAuthorisation}>Confirm auth</button>
                  </li>
                </ol>
              </div>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LunchPicker;
