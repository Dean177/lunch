import './Landing.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { enterOptionName, addLunchOption } from '../actionCreators/lunchActionCreators';
import Autosuggest from 'react-autosuggest';

@connect(state => state.lunch)
class Landing extends Component {
  static propTypes = {
    optionName: PropTypes.string.isRequired,
    lunchOptions: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { dispatch } = this.props;

    this.onSubmit = (event) => {
      event.preventDefault();

      if (this.props.optionName.length > 0) {
        dispatch(addLunchOption(this.props.optionName));
      }

      const stateNav = pushState(null, '/lunch');
      console.log(stateNav);
      dispatch(stateNav);
    };

    this.onChange = (value) => {
      dispatch(enterOptionName(value));
    };

    this.getSuggestions = (input, callback) => {
      const regex = new RegExp(`^${input}`, 'i');
      const suggestions = this.props.lunchOptions.filter(option => regex.test(option));
      callback(null, suggestions);
    };
  }

  componentDidMount() {
    this.refs.optionText.refs.input.focus();
  }

  render() {
    const inputAttributes = {
      className: 'autoSuggest borderless',
      placeholder: 'Food...',
      type: 'search',
      onChange: this.onChange,
    };

    const theme = {
      root: 'react-autosuggest',
      suggestions: 'react-autosuggest__suggestions',
      suggestion: 'react-autosuggest__suggestion',
      suggestionIsFocused: 'react-autosuggest__suggestion--focused',
      section: 'react-autosuggest__suggestions-section',
      sectionName: 'react-autosuggest__suggestions-section-name',
      sectionSuggestions: 'react-autosuggest__suggestions-section-suggestions',
    };

    const autoSuggestInput = (
      <Autosuggest suggestions={ this.getSuggestions }
                   ref="optionText"
                   value={ this.props.optionName }
                   showWhen={ input => input.trim().length >= 2 }
                   inputAttributes={ inputAttributes }
                   theme={ theme }
      />
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
