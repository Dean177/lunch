import * as React from 'react';

class MockComponent extends React.Component<any, {}> {
  render() {
    return <div className="mock-component">props.children</div>;
  }
}

module.exports = MockComponent;
