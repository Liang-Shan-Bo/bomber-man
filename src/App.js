import React, { Component } from 'react';
import Maps from './components/Map';
import Man from './components/Man';
import Bomb from './components/Bomb';
import Fire from './components/Fire';
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
      bombs: new Map(),
      fires: new Set(),
    }
  }

  getMaps = () => {
    const result = []
    this.state.maps.forEach((arr, i) => {
      arr.forEach((type, j) => {
        result.push(<Maps key={i * 9 + j} x={j} y={i} type={type} />)
      })
    })
    return result;
  }

  getBombs = () => {
    const result = []
<<<<<<< HEAD
    this.state.bombs.forEach((value, key) => result.push(<Bomb blowUp={this.blowUp} deleteBomb={this.deleteBomb} key={key} x={key % 9} y={Math.trunc(key / 9)} power={value} />))
=======
    this.state.bombs.forEach(i => {
      const x = i % 9, y = Math.trunc(i / 9);
      result.push(
        <Bomb
          deleteBomb={this.deleteBomb(x, y)}
          key={i}
          x={x}
          y={y}
        />
      )
    })
>>>>>>> origin/master
    return result;
  }

  getFires = () => {
    const result = []
    this.state.fires.forEach((i) => result.push(<Fire deleteFire={this.deleteFire} key={i} x={i % 9} y={Math.trunc(i / 9)} />))
    return result;
  }

  setBombs = (x, y, power) => {
    this.setState(({ bombs }) => {
      bombs.set(x + y * 9, power);
      return bombs;
    })
  }

<<<<<<< HEAD
  deleteBomb = (x, y) => {
    this.setState(({ bombs }) => {
=======
  deleteBomb = (x, y) => () => {
    this.setState(({bombs}) => {
>>>>>>> origin/master
      bombs.delete(x + y * 9);
      return bombs;
    })

  }

  deleteFire = (x, y) => {
    this.setState(({ fires }) => {
      fires.delete(x + y * 9);
      return fires;
    })

  }

  touchItem = (x, y) => {
    let maps = this.state.maps;
    maps[y][x] = 'lawn';
    this.setState({
      maps,
    })
  }

  blowUp = (x, y, power) => {
    let i = 1;
    let maps = this.state.maps;
    let fires = new Set();
    fires.add(x + y * 9);
    while (i <= power) {
      if (y + i < 5 && maps[y + i][x] === 'lawn') {
        fires.add(x + (y + i) * 9);
      } else {
        break;
      }
      i++;
    }
    i = 1;
    while (i <= power) {
      if (y >= i && maps[y - i][x] === 'lawn') {
        fires.add(x + (y - i) * 9);
      } else {
        break;
      }
      i++;
    }
    i = 1;
    while (i <= power) {
      if (x + i < 9 && maps[y][x + i] === 'lawn') {
        fires.add(x + i + y * 9);
      } else {
        break;
      }
      i++;
    }
    i = 1;
    while (i <= power) {
      if (x >= i && maps[y][x - i] === 'lawn') {
        fires.add(x - i + y * 9);
      } else {
        break;
      }
      i++;
    }
    this.setState({
      fires,
    })
  }

  render() {
    return (
      <div>
        {this.getMaps()}
        {this.getBombs()}
        {this.getFires()}
        <Man setBombs={this.setBombs} touchItem={this.touchItem} maps={this.state.maps} />
      </div>
    );
  }
}

export default App;
