import './Landing.scss';
import React, { Component, PropTypes } from 'react';
import { Person, LunchOption } from '../PropTypes';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { compose } from 'underscore';
import { enterOptionName, addLunchOption } from '../../shared/actionCreators/lunchActionCreators';
import OptionAutosuggest from '../components/OptionAutosuggest';

@connect(state => ({
  optionName: state.lunch.optionName,
  lunchOptions: state.lunch.lunchOptions,
  user: state.user,
}))
class Landing extends Component {
  static propTypes = {
    optionName: PropTypes.string.isRequired,
    lunchOptions: PropTypes.arrayOf(LunchOption).isRequired,
    user: Person.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { dispatch, user, optionName } = this.props;

    if (optionName.length > 0) {
      dispatch(addLunchOption(user, optionName));
    }

    dispatch(routeActions.push('/lunch'));
  };

  onNameChange = compose(this.props.dispatch, enterOptionName);

  getSuggestions = (input, callback) => {
    const regex = new RegExp(`^${input}`, 'i');
    const suggestions = this.props.lunchOptions.filter(option => regex.test(option.name));
    callback(null, suggestions);
  };

  render() {
    const autoSuggestInput = (
      <OptionAutosuggest
        value={ this.props.optionName }
        placeholder='Food...'
        onChange={this.onNameChange}
        getSuggestions={this.getSuggestions}
        inputClass='borderless'
      />
    );

    return (
      <form onSubmit={ this.onSubmit } className='Landing'>
        <h1> I want { autoSuggestInput } for lunch </h1>
        <button className='btn btn-primary-outline btn-lg' type='submit'>Go</button>
      </form>
    );
  }
}

export default Landing;
