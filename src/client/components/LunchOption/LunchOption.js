import React, { Component, PropTypes } from 'react';

class LunchOption extends Component {
  static propTypes = {
    chosenCount: PropTypes.number.isRequired,
    onChosen: PropTypes.func.isRequired,
    optionId: PropTypes.string.isRequired,
    optionName: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.props.onChosen(this.props.optionId);
  }

  render() {
    const { chosenCount, optionName } = this.props;
    return (
      <div className='LunchOption' onClick={this._onClick}>
        <div className='option-name'>{optionName}</div>
        <div className='choice-count'>{chosenCount}</div>
      </div>
    );
  }
}

export default LunchOption;
