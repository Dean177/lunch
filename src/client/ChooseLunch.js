import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LunchActionCreators from './actionCreators/lunchActionCreators';
import OptionAdder from './OptionAdder/OptionAdder';

import { Spring } from 'react-motion';
import { range } from 'underscore';

function reinsert(array, from, to) {
  const _array = array.slice(0);
  const val = _array[from];
  _array.splice(from, 1);
  _array.splice(to, 0, val);
  return _array;
}

function clamp(num, min, max) {
  return Math.max(Math.min(num, max), min);
}

const allColors = [
  '#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
  '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
];

const [count, width, height, top, left] = [14, 80, 90, 0, 0];

const springConfig = [200, 10];

const columns = 4;

// indexed by visual position
const layout = range(count).map(num => {
  const row = Math.floor(num / columns);
  const col = num % columns;
  return [width * col, height * row];
});

@connect(state => state.lunch)
class Landing extends Component {

  static propTypes = {
    enteringNewOption: PropTypes.bool,
    optionName: PropTypes.string,
    lunchOptions: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      mouse: [0, 0],
      delta: [0, 0], // difference between mouse and circle pos, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: false,
      order: range(count), // index: visual position. value: component key/id
    };

    this.handleTouchStart = (key, pressLocation, event) =>{
      this.handleMouseDown(key, pressLocation, event.touches[0]);
    };

    this.handleTouchMove = (event) => {
      event.preventDefault();
      this.handleMouseMove(event.touches[0]);
    };

    this.handleMouseMove = ({pageX, pageY}) => {
      const {order, lastPress, isPressed, delta: [dx, dy]} = this.state;
      if (isPressed) {
        const col = clamp(Math.floor((pageX - left) / width), 0, 2);
        const row = clamp(Math.floor((pageY - top) / height), 0, Math.floor(count / columns));
        const index = (row * columns) + col;

        const newOrder = reinsert(order, order.indexOf(lastPress), index);
        this.setState({mouse: [pageX - dx, pageY - dy], order: newOrder});
      }
    };

    this.handleMouseDown = (key, [pressX, pressY], {pageX, pageY}) => {
      this.setState({
        lastPress: key,
        isPressed: true,
        delta: [pageX - pressX, pageY - pressY],
        mouse: [pressX, pressY],
      });
    };


    this.handleMouseUp = () => {
      this.setState({isPressed: false, delta: [0, 0]});
    };

    this.getValues = () => {
      const {order, lastPress, isPressed, mouse} = this.state;
      return {
        order: order.map((_, key) => {
          if (key === lastPress && isPressed) {
            return {
              val: mouse, config: [],
            };
          }

          const visualPosition = order.indexOf(key);
          return {
            val: layout[visualPosition], config: [120, 17],
          };
        }),
        scales: {
          val: range(count).map((_, key) => lastPress === key && isPressed ? 1.2 : 1),
          config: springConfig,
        },
      };
    };
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const {order, lastPress} = this.state;

    const {
      enteringNewOption,
      optionName,
      lunchOptions,
      dispatch,
    } = this.props;

    const lunchOptionColumns = lunchOptions.map(({id, name}) => {
      return (
        <div className="OptionColumn" key={id}>
          <button className="btn btn-primary" type="button">{name}</button>
        </div>
      );
    });

    return (
      <div className="ChooseLunch container">
        <Spring endValue={this.getValues()}>
          {({ order: currOrder, scales: {val: scales} }) =>
            <div className="demo2"
              onTouchMove={this.handleTouchMove}
              onTouchEnd={this.handleMouseUp}
              onMouseMove={this.handleMouseMove}
              onMouseUp={this.handleMouseUp}>
              {currOrder.map(({val: [x, y]}, key) =>
                <div
                  key={key}
                  onMouseDown={this.handleMouseDown.bind(null, key, [x, y])}
                  onTouchStart={this.handleTouchStart.bind(null, key, [x, y])}
                  className="demo2-ball"
                  style={{
                    backgroundColor: allColors[key],
                    transform: `translate3d(${x + left}px, ${y + top}px, 0) scale(${scales[key]})`,
                    zIndex: key === lastPress ? 99 : order.indexOf(key),
                  }}
                ></div>
              )}
            </div>
          }
        </Spring>

        <h2>Lunchtime</h2>
        <div className="LunchPicker">
          <div className="OptionColumns" ref="OptionColumns">
            {lunchOptionColumns}
            <div className="OptionColumn">
              <OptionAdder
                isAdding={enteringNewOption}
                optionName={optionName}
                {...bindActionCreators(LunchActionCreators, dispatch)} />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Landing;
