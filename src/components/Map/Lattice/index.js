import React, { Component } from 'react';
import './style.css';

const side = 32;

class Map extends Component {
  render() {
    const { x, y, type } = this.props
    const [left, top] = [x * side, y * side]
    return (
      <div
        style={{ left, top }}
        className={`map map-${type}`}
      />
    );
  }
}

export default Map;
