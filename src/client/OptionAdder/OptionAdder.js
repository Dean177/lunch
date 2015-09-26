import React, { Component, PropTypes } from 'react';

class OptionAdder extends Component {
  static propTypes = {
    isAdding: PropTypes.bool.isRequired,
    optionName: PropTypes.string.isRequired,
    toggleNewOption: PropTypes.func.isRequired,
    addLunchOption: PropTypes.func.isRequired,
    enterOptionName: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const {
      toggleNewOption,
      addLunchOption,
      enterOptionName,
    } = props;

    this.enterNewOption = () => {
      toggleNewOption();
    };

    this.onNewOption = (event) => {
      event.preventDefault();
      addLunchOption(this.props.optionName);
    };

    this.onLunchNameText = ({ target: { value }}) => {
      enterOptionName(value);
    };

    this.onBlur = () => {
      toggleNewOption();
    };
  }

  componentDidUpdate() {
    if (this.props.isAdding) {
      this.refs.optionTextInput.focus();
    }
  }

  render() {
    let childElement;
    if (!this.props.isAdding) {
      childElement = (<button className="btn btn-primary" type="button" onClick={this.enterNewOption}>+</button>);
    } else {
      childElement = (
        <form onSubmit={this.onNewOption}>
          <div className="input-group">
            <input type="text" className="form-control" placeholder=""
                   ref="optionTextInput"
                   value={this.props.optionName}
                   onChange={this.onLunchNameText}
                   onBlur={this.onBlur} />
            <span className="input-group-btn">
              <button className="btn btn-primary" type="submit" onClick={this.onNewOption}>Go!</button>
            </span>
          </div>
      </form>
      );
    }

    return (
      <div className="OptionAdder">
        {childElement}
      </div>
    );
  }
}

export default OptionAdder;
