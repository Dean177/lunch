import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeName, changeImageUrl } from '../actionCreators/userActionCreator';
import PersonSquare from '../components/PersonSquare/PersonSquare';
import { Link } from 'react-router';


@connect(appState => ({ user: appState.user }))
class LunchPicker extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onSubmit = (event) => {
      event.preventDefault();
    };

    this.onNameChange = (event) => {
      this.props.dispatch(changeName(this.props.user.id, event.target.value));
    };

    this.onImageChange = (event) => {
      this.props.dispatch(changeImageUrl(this.props.user.id, event.target.value));
    };
  }

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
              <input onChange={this.onNameChange} value={user.name} type="text" className="form-control"></input>
            </div>

            <div className="form-group">
              <label>Image Url</label>
              <input onChange={this.onImageChange} value={user.imageUrl} type="text" className="form-control"></input>
            </div>

            <PersonSquare person={user} />
          </form>
        </div>
      </div>
    );
  }
}

export default LunchPicker;
