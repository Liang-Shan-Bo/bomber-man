import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lattice from './Lattice';

class Map extends Component {
  getMaps = () => {
    const result = []
    this.props.map.maps.forEach((arr, i) => {
      arr.forEach((type, j) => {
        result.push(<Lattice key={i * 9 + j} x={j} y={i} type={type} />)
      })
    })
    return result;
  }
  
  render(){
    return (
      <div>
        {this.getMaps()}
      </div>
    )
  }
}

export default connect(
  state => ({map: state.map})
)(Map)