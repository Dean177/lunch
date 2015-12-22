import React, { PropTypes } from 'react';

function LunchOption({ optionName, chosenCount, onChosen }) {
    return (
      <div className='LunchOption' onClick={onChosen}>
        <div className='option-name'>{optionName}</div>
        <div className='choice-count'>{chosenCount}</div>
      </div>
    );
}

LunchOption.propTypes = {
  optionName: PropTypes.string.isRequired,
  chosenCount: PropTypes.number.isRequired,
  onChosen: PropTypes.func.isRequired,
};

export default LunchOption;
