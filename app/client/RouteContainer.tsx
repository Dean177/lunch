import * as React from 'react';

export class RouteContainer extends React.Component<any, any> {
  render() {
    return <div>{this.props.children}</div>;
  }
}
