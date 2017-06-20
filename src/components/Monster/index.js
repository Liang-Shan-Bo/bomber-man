import React, { Component } from 'react';
import Death from '../../Death.js'
import { findDOMNode } from 'react-dom';
import './style.css';

const side = 32;
let moveFlag = -1;

class Monster extends Component {
  constructor(props) {
    super(props);
    Death.monster.add(this.onDeath); //add listener
    this.state = {
      monster: { x: 7, y: 4 },
      alive: true,
    }
  }

  onDeath = (sets) => {
    const node = findDOMNode(this.monster);
    let { x, y } = this.state.monster;
    for (let set of sets) {
      if (this.graphicCollision({ x: set % 9, y: Math.trunc(set / 9) }, { x: x, y: y })) {
        clearInterval(this.timer);
        node.style.webkitAnimation = 'death-monster 3s steps(1, end) 1 forwards';
        setTimeout(() => { this.setState({ alive: false, }); this.deleteMonster(); }, 3000);
        return;
      }
    }
  }
  // 删除怪物
  deleteMonster = () => {
    return this.props.deleteMonster();
  }
  // 2个正方形碰撞判断
  graphicCollision = (p1, p2) => {
    if (p2.x > p1.x - 1 && p2.x < p1.x + 1 && p2.y > p1.y - 1 && p2.y < p1.y + 1) {
      return true;
    }
    return false;
  }
  // 位移
  parseToFixed = (num, ope) => {
    if (ope === 0) {
      return Number.parseFloat((num - 0.1).toFixed(1));
    } else {
      return Number.parseFloat((num + 0.1).toFixed(1));
    }
  }
  // 传说中的AI
  randomMove = () => {
    const { maps, bombs } = this.props;
    let { x, y } = this.state.monster;
    let set = new Set();
    if (y > 0 && (y % 1 !== 0 || (y % 1 === 0 && maps[y - 1][x] !== 'wall' && maps[y - 1][x] !== 'iron'))) {
      if (!bombs.has((y - 1) * 9 + x)) {
        set.add(1);
      }
    }
    if (x > 0 && (x % 1 !== 0 || (x % 1 === 0 && maps[y][x - 1] !== 'wall' && maps[y][x - 1] !== 'iron'))) {
      if (!bombs.has(y * 9 + x - 1)) {
        set.add(0);
      }
    }
    if (x < 8 && (x % 1 !== 0 || (x % 1 === 0 && maps[y][x + 1] !== 'wall' && maps[y][x + 1] !== 'iron'))) {
      if (!bombs.has(y * 9 + x + 1)) {
        set.add(2);
      }
    }
    if (y < 4 && (y % 1 !== 0 || (y % 1 === 0 && maps[y + 1][x] !== 'wall' && maps[y + 1][x] !== 'iron'))) {
      if (!bombs.has((y + 1) * 9 + x)) {
        set.add(3);
      }
    }
    let arr = Array.from(set);
    moveFlag = arr[Math.round(Math.random() * (arr.length - 1))] + 37;
  }

  // 移动
  move = key => {
    const node = findDOMNode(this.monster);
    const { maps } = this.props;
    const { monster } = this.state;
    let { x, y } = monster;
    switch (moveFlag) {
      case 38:
        // 上
        if (y > 0 && ((y % 1 === 0 && maps[y - 1][x] !== 'wall' && maps[y - 1][x] !== 'iron') || y % 1 !== 0)) {
          y = this.parseToFixed(y, 0);
        }
        break
      case 37:
        //左
        if (x > 0 && ((x % 1 === 0 && maps[y][x - 1] !== 'wall' && maps[y][x - 1] !== 'iron') || x % 1 !== 0)) {
          x = this.parseToFixed(x, 0);
        }
        break
      case 39:
        // 右
        if (x < 8 && ((x % 1 === 0 && maps[y][x + 1] !== 'wall' && maps[y][x + 1] !== 'iron') || x % 1 !== 0)) {
          x = this.parseToFixed(x, 1);
        }
        break
      case 40:
        // 下
        if (y < 4 && ((y % 1 === 0 && maps[y + 1][x] !== 'wall' && maps[y + 1][x] !== 'iron') || y % 1 !== 0)) {
          y = this.parseToFixed(y, 1);
        }
        break
      default:
        break
    }
    node.style.webkitAnimation = 'move 1s steps(1, end) infinite';
    Death.man.dispatch({ x: x, y: y });
    this.setState({
      monster: {
        x,
        y,
      },
    })
    if (x % 1 === 0 && y % 1 === 0) {
      this.randomMove();
    }
  }

  componentDidMount() {
    // 循环播放
    this.timer = setInterval(() => this.move(moveFlag), 100);
  }

  render() {
    const { alive, monster: { x, y } } = this.state
    const [left, top] = [x * side, y * side]
    return (
      <div>
        {alive && <div ref={monster => this.monster = monster} style={{ left, top }} className={`monster`} />}
      </div>
    );
  }
}

export default Monster;
