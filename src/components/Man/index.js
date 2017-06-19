import React, { Component } from 'react';
import Death from '../../Death.js'
import { findDOMNode } from 'react-dom';
import './style.css';

const side = 32;
let moveFlag = -1;
let [power] = [1];

class Man extends Component {
  constructor(props) {
    super(props);
    Death.man.add(this.onDeath); //add listener
    this.state = {
      man: { x: 0, y: 0, type: 'left' },
      alive: true,
    }
  }

  // 角色死亡
  onDeath = (sets) => {
    const node = findDOMNode(this.man);
    let { man: { x, y }, alive } = this.state;
    if (alive) {
      if (sets instanceof Set) {
        for (let set of sets) {
          if (this.graphicCollision({ x: set % 9, y: Math.trunc(set / 9) }, { x: x, y: y })) {
            clearInterval(this.timer);
            node.style.webkitAnimation = 'death 1s steps(1, end) 1 forwards';
            setTimeout(() => { this.setState({ alive: false, }) }, 1000);
            setTimeout(() => { alert('游戏结束') }, 2000);
            return;
          }
        }
      } else {
        if (this.graphicCollision({ x: sets.x, y: sets.y }, { x: x, y: y })) {
          clearInterval(this.timer);
          node.style.webkitAnimation = 'death 1s steps(1, end) 1 forwards';
          setTimeout(() => { this.setState({ alive: false, }) }, 1000);
          setTimeout(() => { alert('游戏结束') }, 2000);
          return;
        }
      }
    }
  }
  // 2个正方形碰撞判断
  graphicCollision = (p1, p2) => {
    if (p2.x > p1.x - 0.8 && p2.x < p1.x + 0.8 && p2.y > p1.y - 0.8 && p2.y < p1.y + 0.8) {
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
  // 放置地雷
  setBomb = () => {
    if (this.state.alive) {
      this.props.setBombs(Math.round(this.state.man.x), Math.round(this.state.man.y), power);
    }
  }
  // 道具碰撞判断
  collision = () => {
    const { maps } = this.props;
    let { x, y } = this.state.man;
    let item = maps[Math.round(y)][Math.round(x)];
    if (item !== 'lawn') {
      switch (item) {
        case 'power':
          power++;
          break;
        case 'door':
          clearInterval(this.timer);
          this.setState({ alive: false, });
          alert('游戏结束');
          break;
        default:
          break;
      }
      this.props.touchItem(Math.round(x), Math.round(y));
    }
  }

  // 移动
  move = key => {
    const node = findDOMNode(this.man);
    const { maps } = this.props;
    const { man } = this.state;
    let { x, y, type } = man;
    switch (key) {
      case 38:
        // 上
        type = 'up';
        if (x % 1 !== 0) {
          if (x % 1 > 0.65) {
            x = this.parseToFixed(x, 1);
          } else if (x % 1 < 0.35) {
            x = this.parseToFixed(x, 0);
          }
        } else {
          if (y > 0 && ((y % 1 === 0 && maps[y - 1][x] !== 'wall' && maps[y - 1][x] !== 'iron') || y % 1 !== 0)) {
            y = this.parseToFixed(y, 0);
          }
        }
        node.style.webkitAnimation = 'up 0.25s steps(1, end) 1';
        break
      case 37:
        //左
        type = 'left';
        if (y % 1 !== 0) {
          if (y % 1 > 0.65) {
            y = this.parseToFixed(y, 1);
          } else if (y % 1 < 0.35) {
            y = this.parseToFixed(y, 0);
          }
        } else {
          if (x > 0 && ((x % 1 === 0 && maps[y][x - 1] !== 'wall' && maps[y][x - 1] !== 'iron') || x % 1 !== 0)) {
            x = this.parseToFixed(x, 0);
          }
        }
        node.style.webkitAnimation = 'left 0.25s steps(1, end) 1';
        break
      case 39:
        // 右
        type = 'right';
        if (y % 1 !== 0) {
          if (y % 1 > 0.65) {
            y = this.parseToFixed(y, 1);
          } else if (y % 1 < 0.35) {
            y = this.parseToFixed(y, 0);
          }
        } else {
          if (x < 8 && ((x % 1 === 0 && maps[y][x + 1] !== 'wall' && maps[y][x + 1] !== 'iron') || x % 1 !== 0)) {
            x = this.parseToFixed(x, 1);
          }
        }
        node.style.webkitAnimation = 'right 0.25s steps(1, end) 1';
        break
      case 40:
        // 下
        type = 'down';
        if (x % 1 !== 0) {
          if (x % 1 > 0.65) {
            x = this.parseToFixed(x, 1);
          } else if (x % 1 < 0.35) {
            x = this.parseToFixed(x, 0);
          }
        } else {
          if (y < 4 && ((y % 1 === 0 && maps[y + 1][x] !== 'wall' && maps[y + 1][x] !== 'iron') || y % 1 !== 0)) {
            y = this.parseToFixed(y, 1);
          }
        }
        node.style.webkitAnimation = 'down 0.25s steps(1, end) 1';
        break
      default:
        break
    }
    // 道具碰撞判断
    this.collision()
    this.setState({
      man: {
        x,
        y,
        type,
      },
    })
  }

  componentDidMount() {
    const node = findDOMNode(this.man);
    // 键盘按下事件
    document.addEventListener('keydown', ({ keyCode }) => keyCode === 32 ? this.setBomb() : moveFlag = keyCode)
    // 键盘抬起事件
    document.addEventListener('keyup', ({ keyCode }) => {
      if ([37, 38, 39, 40].indexOf(keyCode) > -1) {
        moveFlag = -1
      }
    })
    // 动画结束事件
    node.addEventListener('webkitAnimationEnd', () => node.style.webkitAnimation = '', false);
    // 循环播放
    this.timer = setInterval(() => this.move(moveFlag), 100);
  }

  render() {
    const { alive, man: { x, y, type } } = this.state
    const [left, top] = [x * side, y * side]
    return (
      <div>
        {alive && <div ref={man => this.man = man} style={{ left, top }} className={`man man-${type}`} />}
      </div>
    );
  }
}

export default Man;
