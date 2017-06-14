import React, { Component } from 'react';
import Map from './components/Map';
import Man from './components/Man';
import Bomb from './components/Bomb';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      maps: [['lawn', 'lawn', 'lawn', 'lawn', 'lawn', 'power', 'wall', 'lawn', 'lawn'],
      ['lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn'],
      ['wall', 'lawn', 'lawn', 'wall', 'lawn', 'lawn', 'wall', 'lawn', 'lawn'],
      ['lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn'],
      ['lawn', 'lawn', 'lawn', 'lawn', 'wall', 'lawn', 'wall', 'lawn', 'door']],
    }
  }

  getMaps = () => {
    const result = []
    this.state.maps.forEach((arr, i) => {
      arr.forEach((type, j) => {
        result.push(<Map key={i * 9 + j} x={j} y={i} type={type} />)
      })
    })
    return result;
  }

  setBombs = (x, y) => {
    console.log('x=:' + x)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {this.getMaps()}
        <Man ref={man => this.man = man} maps={this.state.maps} />
      </div>
    );
  }
}

export default App;
