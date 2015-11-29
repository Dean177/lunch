import * as React from 'react';
import { connect } from 'react-redux';
import { changeName, changeImageUrl } from '../actionCreators/userActionCreator';
import {PersonSquare} from '../components/PersonSquare/PersonSquare';
import { Link } from 'react-router';

interface UserConfigProps {
  user: Person,
  dispatch: Dispatch;
}

@connect(appState => ({ user: appState.user }))
export class UserConfig extends React.Component<UserConfigProps, {}> {

  onImageChange = (event) => {
    this.props.dispatch(changeImageUrl(this.props.user.id, event.target.value));
  };

  onNameChange = (event) => {
    this.props.dispatch(changeName(this.props.user.id, event.target.value));
  };

  onSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { user } = this.props;
    return (
      <div className="UserConfig">
        <Link to="/lunch" className="main-nav-link">
          <i className="fa fa-square-o" />
        </Link>
        <div className="container">
          <h1>Settings</h1>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input onChange={this.onNameChange} value={user.name} type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>Image Url</label>
              <input onChange={this.onImageChange} value={user.imageUrl} type="text" className="form-control" />
            </div>

            <PersonSquare person={user} />
          </form>
        </div>
      </div>
    );
  }
}
