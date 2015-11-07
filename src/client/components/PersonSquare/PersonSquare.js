import React, { Component, PropTypes } from 'react';

class PersonSquare extends Component {
  static propTypes = {
    person: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
    }),
  };

  render() {
    const url = this.props.person.imageUrl || 'http://png-4.findicons.com/files/icons/2770/ios_7_icons/512/user_male.png';
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
