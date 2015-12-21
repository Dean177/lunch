import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class PersonSquare extends Component {
  static propTypes = {
    person: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
    }),
    isFetching: PropTypes.boolean,
  };

  render() {
    const url = this.props.person.imageUrl || 'http://png-4.findicons.com/files/icons/2770/ios_7_icons/512/user_male.png';
    const isFetching = !!this.props.isFetching;
    console.log(this.props.person.name, isFetching);
    return (
      <img {...this.props}
        className={classNames('PersonSquare', { 'isFetching': isFetching })}
        alt={this.props.person.name}
        title={this.props.person.name}
        src={url}
      />
    );
  }
}

export default PersonSquare;
