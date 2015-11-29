import * as React from 'react';

interface LunchChoiceProps {
  chosenCount: number,
  key?: string | number;
  onChosen: { (): void },
  optionName: string,
}

export class LunchChoice extends React.Component<LunchChoiceProps, {}> {
  render() {
    const { optionName, chosenCount, onChosen } = this.props;

    return (
      <div className="LunchOption" onClick={onChosen}>
        <div className="option-name">{optionName}</div>
        <div className="choice-count">{chosenCount || 0}</div>
      </div>
    );
  }
}
