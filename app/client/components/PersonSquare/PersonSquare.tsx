/// <reference path='../../../../typings/tsd.d.ts' />
import * as React from 'react';

interface PersonSquareProps {
  person: Person;
  style?: any;
}

export class PersonSquare extends React.Component<PersonSquareProps, {}> {
  public render(): React.ReactElement<{}> {
    const url: string = this.props.person.imageUrl || 'http://png-4.findicons.com/files/icons/2770/ios_7_icons/512/user_male.png';
    return (
      <img {...this.props}
        className='PersonSquare'
        alt={this.props.person.name}
        title={this.props.person.name}
        src={url} />
    );
  }
}
