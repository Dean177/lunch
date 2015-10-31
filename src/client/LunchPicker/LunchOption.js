import './LunchOption.scss';
import React, { Component, PropTypes } from 'react';

class LunchOption extends Component {
  static propTypes = {
    optionName: PropTypes.string.isRequired,
    choiceCount: PropTypes.number.isRequired,
    onChosen: PropTypes.func.isRequired,
  };

  render() {
    const { optionName, choiceCount, onChosen } = this.props;

    return (
      <div className="LunchOption" onClick={onChosen}>
        <div className="option-name">{optionName}</div>
        <div className="choice-count">{choiceCount}</div>
      </div>
    );
  }
}

export default LunchOption;
