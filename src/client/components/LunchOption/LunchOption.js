import React, { PropTypes } from 'react';

function LunchOption({ chosenCount, onChosen, optionName }) {
  return (
    <div className='LunchOption' onClick={onChosen}>
      <div className='option-name'>{optionName}</div>
      <div className='choice-count'>{chosenCount}</div>
    </div>
  );
}

LunchOption.propTypes = {
  chosenCount: PropTypes.number.isRequired,
  onChosen: PropTypes.func.isRequired,
  optionName: PropTypes.string.isRequired,
};

export default LunchOption;
