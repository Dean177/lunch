import * as React from 'react';
import { Link } from 'react-router';
import {LunchPickerWrapper} from './LunchPicker/LunchPickerWrapper';

export class ChooseLunch extends React.Component<any, {}> {
  render() {
    return (
      <div className="ChooseLunch">
        <Link to="/user" className="main-nav-link">
          <i className="fa fa-bars" />
        </Link>
        <LunchPickerWrapper />
      </div>
    );
  }
}
