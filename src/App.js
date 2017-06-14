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
      bombs: new Set(),
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

  getBombs = () => {
    const result = []
    this.state.bombs.forEach((i) => result.push(<Bomb key={i} x={i % 9} y={Math.trunc(i / 9)}  />))
    return result;
  }

  setBombs = (x, y) => {
    this.setState(({bombs}) => {
      bombs.add(x + y * 9);
      return bombs;
    })
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {this.getMaps()}
        {this.getBombs()}
        <Man setBombs={this.setBombs} maps={this.state.maps} />
      </div>
    );
  }
}

export default App;
