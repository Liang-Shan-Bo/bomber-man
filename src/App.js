import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Death from './Death.js'
import Maps from './components/Map';
import Man from './components/Man';
import Monster from './components/Monster';
import Bomb from './components/Bomb';
import Fire from './components/Fire';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      maps: [['lawn', 'lawn', 'lawn', 'lawn', 'lawn', 'wall', 'wall', 'lawn', 'lawn'],
      ['lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn'],
      ['wall', 'lawn', 'lawn', 'wall', 'lawn', 'lawn', 'wall', 'lawn', 'lawn'],
      ['lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn'],
      ['lawn', 'lawn', 'lawn', 'lawn', 'wall', 'lawn', 'wall', 'lawn', 'wall']],
      bombs: new Map(),
      fires: new Set(),
      man: true,
      monster: true,
      item: new Map([[5, 'power'], [44, 'door']]),
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
    this.state.bombs.forEach((value, key) => result.push(<Bomb blowUp={this.blowUp} deleteBomb={this.deleteBomb} key={key} x={key % 9} y={Math.trunc(key / 9)} power={value} />))
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

  setFires = (x, y, power, fires = new Set()) => {
    const items = ['power', 'plural', 'speed', 'control'];
    const item = this.state.item;
    let i = 1;
    let maps = this.state.maps;
    fires.add(x + y * 9);
    while (i <= power) {
      if (y + i < 5) {
        if (maps[y + i][x] === 'lawn' || maps[y + i][x] === 'door') {
          fires.add(x + (y + i) * 9);
        } else if (items.indexOf(maps[y + i][x]) > -1) {
          maps[y + i][x] = 'lawn';
          break;
        } else if (maps[y + i][x] === 'iron') {
          break;
        } else if (maps[y + i][x] === 'wall') {
          if (item.has(x + (y + i) * 9)) {
            maps[y + i][x] = item.get(x + (y + i) * 9);
          } else {
            maps[y + i][x] = 'lawn';
          }
          break;
        }
      } else {
        break;
      }
      i++;
    }
    i = 1;
    while (i <= power) {
      if (y >= i) {
        if (maps[y - i][x] === 'lawn' || maps[y - i][x] === 'door') {
          fires.add(x + (y - i) * 9);
        } else if (items.indexOf(maps[y - i][x]) > -1) {
          maps[y - i][x] = 'lawn';
          break;
        } else if (maps[y - i][x] === 'iron') {
          break;
        } else if (maps[y - i][x] === 'wall') {
          if (item.has(x + (y - i) * 9)) {
            maps[y - i][x] = item.get(x + (y - i) * 9);
          } else {
            maps[y - i][x] = 'lawn';
          }
          break;
        }
      } else {
        break;
      }
      i++;
    }
    i = 1;
    while (i <= power) {
      if (x + i < 9) {
        if (maps[y][x + i] === 'lawn' || maps[y][x + i] === 'door') {
          fires.add(x + i + y * 9);
        } else if (items.indexOf(maps[y][x + i]) > -1) {
          maps[y][x + i] = 'lawn';
          break;
        } else if ([y][x + i] === 'iron') {
          break;
        } else if (maps[y][x + i] === 'wall') {
          if (item.has(x + i + y * 9)) {
            maps[y][x + i] = item.get(x + i + y * 9);
          } else {
            maps[y][x + i] = 'lawn';
          }
          break;
        }
      } else {
        break;
      }
      i++;
    }
    i = 1;
    while (i <= power) {
      if (x >= i) {
        if (maps[y][x - i] === 'lawn' || maps[y][x - i] === 'door') {
          fires.add(x - i + y * 9);
        } else if (items.indexOf(maps[y][x - i]) > -1) {
          maps[y][x - i] = 'lawn';
          break;
        } else if (maps[y][x - i] === 'iron') {
          break;
        } else if (maps[y][x - i] === 'wall') {
          if (item.has(x - i + y * 9)) {
            maps[y][x - i] = item.get(x - i + y * 9);
          } else {
            maps[y][x - i] = 'lawn';
          }
          break;
        }
      } else {
        break;
      }
      i++;
    }
    // 爆炸联动
    this.state.bombs.forEach((value, key) => {
      fires.forEach((set) => {
        if (key === set) {
          let [x, y] = [set % 9, Math.trunc(set / 9)];
          this.deleteBomb(x, y);
          fires = new Set([...fires, ...this.setFires(x, y, value, fires)]);
        }
      })
    })
    return fires;
  }

  deleteBomb = (x, y) => {
    this.setState(({ bombs }) => {
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

  deleteMonster = () => {
    this.state.monster = false;
  }

  getMonster = () => {
    return this.state.monster ? 1 : 0;
  }

  touchItem = (x, y) => {
    let maps = this.state.maps;
    maps[y][x] = 'lawn';
    this.setState({
      maps,
    })
  }

  // 爆炸
  blowUp = (x, y, power) => {
    const fires = this.setFires(x, y, power);
    // 判断死亡
    Death.man.dispatch(fires);
    if (this.state.monster) {
      Death.monster.dispatch(fires);
    }
    this.setState({
      fires,
    })
  }

  render() {
    const { man, monster } = this.state
    return (
      <div>
        {this.getMaps()}
        {this.getBombs()}
        {this.getFires()}
        {man && <Man getMonster={this.getMonster} setBombs={this.setBombs} touchItem={this.touchItem} maps={this.state.maps} />}
        {monster && <Monster deleteMonster={this.deleteMonster} maps={this.state.maps} bombs={this.state.bombs} />}
      </div>
    );
  }
}

export default App;
