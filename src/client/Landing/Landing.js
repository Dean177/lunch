import './Landing.scss';
import React, { Component, PropTypes } from 'react';
import { Person, LunchOption } from '../PropTypes';
import OptionAutosuggest from '../components/OptionAutosuggest';

class Landing extends Component {
  static propTypes = {
    optionName: PropTypes.string.isRequired,
    lunchOptions: PropTypes.arrayOf(LunchOption).isRequired,
    user: Person.isRequired,
    addLunchOption: PropTypes.func.isRequired,
    enterOptionName: PropTypes.func.isRequired,
    navigateToRoute: PropTypes.func.isRequired,
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { addLunchOption, user, optionName } = this.props;

    if (optionName.length > 0) {
      addLunchOption(user, optionName);
    }

    this.props.navigateToRoute('/lunch');
  };

  onNameChange = this.props.enterOptionName;

  getSuggestions = (input) => {
    if (input.trim().length < 2) {
      return [];
    }
    const regex = new RegExp(`^${input}`, 'i');
    return this.props.lunchOptions.filter(option => regex.test(option.name));
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
