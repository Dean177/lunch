import * as React from 'react';
import Autosuggest from 'react-autosuggest';

interface OptionAutosuggestProps {
  getSuggestions: Function;
  inputClass: string;
  onBlur?: Function;
  onChange: Function;
  placeholder?: string;
  value: string;
}

interface OptionText extends React.Component<any, any> {
  refs: {
    [string: string]: any;
    input: {
      focus: Function
    }
  }
}

export class OptionAutosuggest extends React.Component<OptionAutosuggestProps, {}> {
  refs: {
    [string: string]: any;
    optionText: OptionText;
  };

  componentDidMount() {
    this.refs.optionText.refs.input.focus();
  }

  theme = {
    root: 'react-autosuggest',
    suggestions: 'react-autosuggest__suggestions',
    suggestion: 'react-autosuggest__suggestion',
    suggestionIsFocused: 'react-autosuggest__suggestion--focused',
    section: 'react-autosuggest__suggestions-section',
    sectionName: 'react-autosuggest__suggestions-section-name',
    sectionSuggestions: 'react-autosuggest__suggestions-section-suggestions',
  };

  render() {
    const inputAttributes = {
      className: this.props.inputClass,
      onBlur: this.props.onBlur,
      onChange: this.props.onChange,
      placeholder: this.props.placeholder || '',
      type: 'search',
    };

    return (
      <Autosuggest suggestions={ this.props.getSuggestions }
                   suggestionRenderer={(lunchOption) => lunchOption.name}
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
