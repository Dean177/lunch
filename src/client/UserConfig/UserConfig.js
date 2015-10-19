import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeName } from '../actionCreators/userActionCreator';


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

    this.onChange = (event) => {
      this.props.dispatch(changeName(this.props.user.id, event.target.value));
    };
  }

  render() {
    return (
      <div className="UserConfig">
        <h1>Settings</h1>
        <form className="form-inline" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input onChange={this.onChange} value={this.props.user.name} type="text"/>
          </div>
        </form>
      </div>
    );
  }
}

export default LunchPicker;
