import {OptionAutosuggest} from '../components/OptionAutosuggest';
import * as React from 'react';
import EventHandler = __React.EventHandler;
import SyntheticEvent = __React.SyntheticEvent;

interface OptionAdderProps {
  user: Person,
  isAdding: boolean,
  optionName: string,
  lunchOptions: LunchOption[],
  toggleNewOption: EventHandler<SyntheticEvent>,
  addLunchOption: Function,
  enterOptionName: Function
}

export class OptionAdder extends React.Component<OptionAdderProps, {}> {

  onNewOption = (event) => {
    event.preventDefault();
    this.props.addLunchOption(this.props.user, this.props.optionName);
  };

  getSuggestions = (input, callback) => {
    const regex = new RegExp(`^${input}`, 'i');
    const suggestions = this.props.lunchOptions.filter(option => regex.test(option.name));
    callback(null, suggestions);
  };

  render() {
    const addButton = (<button className="btn btn-primary add-button"
                               type="button"
                               onClick={this.props.toggleNewOption}>+</button>);
    const inputBox = (
      <form className="AddOptionForm" onSubmit={this.onNewOption}>
        <OptionAutosuggest value={this.props.optionName}
                           onChange={this.props.enterOptionName}
                           getSuggestions={this.getSuggestions}
                           onBlur={this.props.toggleNewOption}
                           inputClass="option-input"/>
        <button className="go-button" type="submit" onClick={this.onNewOption}>Go!</button>
      </form>
    );

    return (
      <div className="OptionAdder">
        {(this.props.isAdding) ? inputBox : addButton}
      </div>
    );
  }
}
