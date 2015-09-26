import React, { Component } from 'react';

class LunchPicker extends Component {
  render() {
    const columns = [];
    return (
      <div className="LunchPicker">
        {columns}
        <div className="OptionColumn"></div>
      </div>
    );
  }
}

export default LunchPicker;
