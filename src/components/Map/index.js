import React, { Component } from 'react';
import './style.css';

const side = 32

class Map extends Component {
  render() {
    const { type, index } = this.props
    const [left, top] = [(index % 9)*side, parseInt(index / 9, 10)*side]
    return (
      <div
       style={{left, top}}
       className={`map map-${type}`}>
      </div>
    );
  }
}

export default Map;
