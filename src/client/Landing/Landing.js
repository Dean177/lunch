import './Landing.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { compose } from 'underscore';
import { enterOptionName, addLunchOption } from '../actionCreators/lunchActionCreators';
import OptionAutosuggest from '../components/OptionAutosuggest';

@connect(state => ({
  optionName: state.lunch.optionName,
  lunchOptions: state.lunch.lunchOptions,
  user: state.user,
}))
class Landing extends Component {
  static propTypes = {
    optionName: PropTypes.string.isRequired,
    lunchOptions: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { dispatch } = this.props;

    this.onSubmit = (event) => {
      event.preventDefault();

      if (this.props.optionName.length > 0) {
        dispatch(addLunchOption(this.props.user, this.props.optionName));
      }

      const stateNav = pushState(null, '/lunch');
      dispatch(stateNav);
    };

    this.onNameChange = compose(dispatch, enterOptionName);

    this.getSuggestions = (input, callback) => {
      const regex = new RegExp(`^${input}`, 'i');
      const suggestions = this.props.lunchOptions.filter(option => regex.test(option.name));
      callback(null, suggestions);
    };
  }


  render() {
    const autoSuggestInput = (
      <OptionAutosuggest value={ this.props.optionName }
                         placeholder="Food..."
                         onChange={this.onNameChange}
                         getSuggestions={this.getSuggestions}
                         inputClass="borderless"/>
    );

    return (
      <form onSubmit={ this.onSubmit } className="Landing">
        <h1> I want { autoSuggestInput } for lunch </h1>
        <button className="btn btn-primary-outline btn-lg" type="submit">Go</button>
      </form>
    );
  }
}

export default Landing;
