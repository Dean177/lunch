import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';

class OptionAutosuggest extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    getSuggestions: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
  };

  theme = {
    root: 'react-autosuggest',
    suggestions: 'react-autosuggest__suggestions',
    suggestion: 'react-autosuggest__suggestion',
    suggestionIsFocused: 'react-autosuggest__suggestion--focused',
    section: 'react-autosuggest__suggestions-section',
    sectionName: 'react-autosuggest__suggestions-section-name',
    sectionSuggestions: 'react-autosuggest__suggestions-section-suggestions',
  };

  componentDidMount() {
    this.refs.optionText.refs.input.focus();
  }


  render() {
    const inputAttributes = {
      className: 'autoSuggest borderless',
      onBlur: this.props.onBlur,
      onChange: this.props.onChange,
      placeholder: this.props.placeholder || '',
      type: 'search',
    };

    return (
      <Autosuggest suggestions={ this.props.getSuggestions }
                   suggestionRenderer={(lunchOption, input) => lunchOption.name}
                   suggestionValue={(lunchOption) => lunchOption.name}
                   ref="optionText"
                   value={ this.props.value }
                   showWhen={ input => input.trim().length >= 2 }
                   inputAttributes={ inputAttributes }
                   theme={ this.theme }
      />
    );
  }
}

export default OptionAutosuggest;
