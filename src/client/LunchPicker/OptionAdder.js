import './OptionAdder.scss';
import OptionAutosuggest from '../components/OptionAutosuggest';
import React, { Component, PropTypes } from 'react';

class OptionAdder extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    isAdding: PropTypes.bool.isRequired,
    optionName: PropTypes.string.isRequired,
    lunchOptions: PropTypes.array.isRequired,
    toggleNewOption: PropTypes.func.isRequired,
    addLunchOption: PropTypes.func.isRequired,
    enterOptionName: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { addLunchOption } = props;

    this.onNewOption = (event) => {
      event.preventDefault();
      addLunchOption(this.props.user, this.props.optionName);
    };

    this.getSuggestions = (input, callback) => {
      const regex = new RegExp(`^${input}`, 'i');
      const suggestions = this.props.lunchOptions.filter(option => regex.test(option.name));
      callback(null, suggestions);
    };
  }

  render() {
    let childElement;
    if (!this.props.isAdding) {
      childElement = (
        <button className="btn btn-primary add-button" type="button" onClick={this.props.toggleNewOption}>+</button>
      );
    } else {
      childElement = (
        <form className="AddOptionForm" onSubmit={this.onNewOption}>
            <OptionAutosuggest value={this.props.optionName}
                               onChange={this.props.enterOptionName}
                               getSuggestions={this.getSuggestions}
                               onBlur={this.props.toggleNewOption}
                               inputClass="option-input"/>
            <button className="go-button" type="submit" onClick={this.onNewOption}>Go!</button>
      </form>
      );
    }

    return (
      <div className="OptionAdder">
        {childElement}
      </div>
    );
  }
}

export default OptionAdder;
