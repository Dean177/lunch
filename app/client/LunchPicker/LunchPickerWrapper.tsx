/// <reference path="../../../typings/tsd.d.ts" />
import * as React from 'react';
import { connect } from 'react-redux';
import {LunchPicker} from "./LunchPicker";
import {LunchPickerProps} from "./LunchPicker";

function select(appState) {
  const {
    enteringNewOption,
    optionName,
    selectedOptionId,
    lunchOptions,
    peopleChoices,
    } = appState.lunch;

  return {
    user: appState.user,
    enteringNewOption,
    optionName,
    selectedOptionId,
    lunchOptions,
    peopleChoices,
  };
}

@connect(select)
export class LunchPickerWrapper extends React.Component<LunchPickerProps, {}> {
  public render() {
    return (<LunchPicker {...this.props} />);
  }
}
