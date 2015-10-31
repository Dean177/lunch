import './PersonSquare.scss';
import React, { Component, PropTypes } from 'react';

class PersonSquare extends Component {
  static propTypes = {
    person: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
    }),
  };

  render() {
    const url = this.props.person.imageUrl || '';
    return (
      <img {...this.props}
           className="PersonSquare"
           alt={this.props.person.name}
           title={this.props.person.name}
           src={url} />
    );
  }
}

export default PersonSquare;
