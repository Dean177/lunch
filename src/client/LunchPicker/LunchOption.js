import './LunchOption.scss';
import React, { Component, PropTypes } from 'react';

class LunchOption extends Component {
  static propTypes = {
    optionName: PropTypes.string.isRequired,
    chosenCount: PropTypes.number.isRequired,
    onChosen: PropTypes.func.isRequired,
  };

  render() {
    const { optionName, chosenCount, onChosen } = this.props;

    return (
      <div className="LunchOption" onClick={onChosen}>
        <div className="option-name">{optionName}</div>
        <div className="choice-count">{chosenCount}</div>
      </div>
    );
  }
}

export default LunchOption;
