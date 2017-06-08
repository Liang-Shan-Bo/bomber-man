import React, { Component } from 'react';
import './style.css';

class Map extends Component {
  render() {
    const { type } = this.props
    return (
      <div className={`map map-${type}`}>
      </div>
    );
  }
}

export default Map;
