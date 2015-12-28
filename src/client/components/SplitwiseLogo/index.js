import './SplitwiseLogo.scss';
import splitwiseLogo from '../../splitwise-logo.png';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

function SplitwiseLogo(props) {
  const classes = classNames('SplitwiseLogo', props.className);
  return (<img {...props} className={classes} src={splitwiseLogo} />);
}

SplitwiseLogo.propTypes = { className: PropTypes.string };

export default SplitwiseLogo;
