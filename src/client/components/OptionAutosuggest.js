import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';

const renderSuggestion = (lunchOption) => <span>{lunchOption.name}</span>;
const getSuggestionValue = (lunchOption) => lunchOption.name;

class OptionAutosuggest extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    getSuggestions: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    inputClass: PropTypes.string,
    onBlur: PropTypes.func,
  };

  render() {
    const { value, inputClass, onChange, onBlur, getSuggestions } = this.props;
    return (
      <Autosuggest
        suggestions={ getSuggestions(value) }
        renderSuggestion={renderSuggestion}
        getSuggestionValue={getSuggestionValue}
        inputProps={{
          className: inputClass,
          value,
          onChange: (event, { newValue }) => { onChange(newValue); },
          ref: (input) => { if (input != null && input.focus) { input.focus(); }},
          onBlur,
          placeholder: this.props.placeholder || '',
          type: 'text',
        }}
        theme={{
          container: 'react-autosuggest',
          suggestionsContainer: 'react-autosuggest__suggestions',
          suggestion: 'react-autosuggest__suggestion',
          suggestionFocused: 'react-autosuggest__suggestion--focused',
        }}
      />
    );
  }
}

export default OptionAutosuggest;
