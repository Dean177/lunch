import './PersonSquare.scss';
import React, { Component, PropTypes } from 'react';

class PersonSquare extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render() {
    return (
      <img {...this.props}
           className="PersonSquare"
           alt={this.props.name}
           src="http://lh6.ggpht.com/s_VyyVsph5meqhCeEGjTCM1cbzTfWr6rUpQmINYrktB18aHES2QQ7LxD6QrvPA-7i_glG54dQRCvUBFYT38SVDAO=s800" />
    );
  }
}

export default PersonSquare;
