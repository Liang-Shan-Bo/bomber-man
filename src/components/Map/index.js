import React, { Component } from 'react';
import './style.css';

const side = 32

class Map extends Component {
  render() {
    const { type, index } = this.props
    //二维数组的话 下面就不用算了，直接就是横纵坐标
    const [left, top] = [(index % 9)*side, parseInt(index / 9, 10)*side]
    return (
      <div
       style={{left, top}}
       className={`map map-${type}`} 
      />
    );
  }
}

export default Map;
