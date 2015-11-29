import './Landing.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import * as _ from 'underscore';
import { enterOptionName, addLunchOption } from '../actionCreators/lunchActionCreators';
import {OptionAutosuggest} from '../components/OptionAutosuggest';


interface LandingPageProps {
  optionName: string,
  lunchOptions: LunchOption[],
  user: Person,
  dispatch: Dispatch,
}

@connect(state => ({
  optionName: state.lunch.optionName,
  lunchOptions: state.lunch.lunchOptions,
  user: state.user,
}))
export class Landing extends React.Component<LandingPageProps, {}> {

  onSubmit = (event) => {
    event.preventDefault();

    if (this.props.optionName.length > 0) {
      this.props.dispatch(addLunchOption(this.props.user, this.props.optionName));
    }

    this.props.dispatch(pushState(null, '/lunch'));
  };

  onNameChange = _.compose(this.props.dispatch, enterOptionName);

  getSuggestions = (input, callback) => {
    const regex = new RegExp(`^${input}`, 'i');
    const suggestions = this.props.lunchOptions.filter((option: LunchOption) => regex.test(option.name));
    callback(null, suggestions);
  };


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
