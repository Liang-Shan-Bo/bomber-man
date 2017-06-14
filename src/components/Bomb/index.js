import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import './style.css';

const side = 32;

class Bomb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bomb: {},
    }
  }

  render() {
    const { x, y } = this.props
    const [left, top] = [x * side, y * side]
    console.log(left)
    return (
      <div
        ref={bomb => this.bomb = bomb}
        style={{ left, top }}
        className={`bomb`}
      />
    );
  }
}

export default Bomb;
