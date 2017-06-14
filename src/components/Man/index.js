import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import './style.css';

const side = 32;
let moveFlag = -1;

class Man extends Component {
  constructor(props) {
    super(props);
    this.state = {
      man: { x: 0, y: 0, type: 'left' },
    }
  }

  parseToFixed = (num, ope) => {
    if (ope === 0) {
      return Number.parseFloat((num - 0.1).toFixed(1));
    } else {
      return Number.parseFloat((num + 0.1).toFixed(1));
    }
  }

  setBomb = (x, y) => {
    this.props.setBombs(Math.round(x), Math.round(y));
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
          if (y > 0 && ((y % 1 === 0 && maps[y - 1][x] === 'lawn') || y % 1 !== 0)) {
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
          if (x > 0 && ((x % 1 === 0 && maps[y][x - 1] === 'lawn') || x % 1 !== 0)) {
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
          if (x < 8 && ((x % 1 === 0 && maps[y][x + 1] === 'lawn') || x % 1 !== 0)) {
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
          if (y < 4 && ((y % 1 === 0 && maps[y + 1][x] === 'lawn') || y % 1 !== 0)) {
            y = this.parseToFixed(y, 1);
          }
        }
        node.style.webkitAnimation = 'down 0.25s steps(1, end) 1';
        break
      case 32:
        // 空格
        this.setBomb(x, y);
        break
      default:
        break
    }
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
    document.addEventListener('keydown', ({ keyCode }) => moveFlag = keyCode)
    // 键盘抬起事件
    document.addEventListener('keyup', () => moveFlag = -1)
    // 动画结束事件
    node.addEventListener('webkitAnimationEnd', () => node.style.webkitAnimation = '', false);
    // 循环播放
    setInterval(() => this.move(moveFlag), 100);
  }

  render() {
    const { man: { x, y, type } } = this.state
    const [left, top] = [x * side, y * side]
    return (
      <div>
        <div
          ref={man => this.man = man}
          style={{ left, top }}
          className={`man man-${type}`}
        />
      </div>
    );
  }
}

export default Man;
