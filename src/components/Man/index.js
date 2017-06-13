import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import './style.css';

const side = 32;
let man = { x: 0, y: 0, direction: 'stop', type: 'left' };
let moveFlag = -1;

class Man extends Component {
  constructor(props) {
    super(props);
    const { maps } = props;
    this.state = {
      man,
      maps,
    }
  }

  parseToFixed = (num, ope) => {
    if (ope === 0) {
      return Number.parseFloat((num - 0.1).toFixed(1));
    } else {
      return Number.parseFloat((num + 0.1).toFixed(1));
    }
  }
  // 移动
  move = (key) => {
    const node = findDOMNode(this.refs.man);

    switch (key) {
      case 38:
        // 上
        man.type = 'up';
        if (man.x % 1 !== 0) {
          if (man.x % 1 > 0.6) {
            man.x = this.parseToFixed(man.x, 1);
          } else if (man.x % 1 < 0.4) {
            man.x = this.parseToFixed(man.x, 0);
          }
        } else {
          if (man.y > 0 && ((man.y % 1 === 0 && this.props.maps[man.y - 1][man.x] === 'lawn') || man.y % 1 !== 0)) {
            man.y = this.parseToFixed(man.y, 0);
          }
        }
        node.style.webkitAnimation = 'up 0.25s steps(1, end) 1';
        break
      case 37:
        //左
        man.type = 'left';
        if (man.y % 1 !== 0) {
          if (man.y % 1 > 0.6) {
            man.y = this.parseToFixed(man.y, 1);
          } else if (man.y % 1 < 0.4) {
            man.y = this.parseToFixed(man.y, 0);
          }
        } else {
          if (man.x > 0 && ((man.x % 1 === 0 && this.props.maps[man.y][man.x - 1] === 'lawn') || man.x % 1 !== 0)) {
            man.x = this.parseToFixed(man.x, 0);
          }
        }
        node.style.webkitAnimation = 'left 0.25s steps(1, end) 1';
        break
      case 39:
        // 右
        man.type = 'right';
        if (man.y % 1 !== 0) {
          if (man.y % 1 > 0.6) {
            man.y = this.parseToFixed(man.y, 1);
          } else if (man.y % 1 < 0.4) {
            man.y = this.parseToFixed(man.y, 0);
          }
        } else {
          if (man.x < 8 && ((man.x % 1 === 0 && this.props.maps[man.y][man.x + 1] === 'lawn') || man.x % 1 !== 0)) {
            man.x = this.parseToFixed(man.x, 1);
          }
        }
        node.style.webkitAnimation = 'right 0.25s steps(1, end) 1';
        break
      case 40:
        // 下
        man.type = 'down';
        if (man.x % 1 !== 0) {
          if (man.x % 1 > 0.6) {
            man.x = this.parseToFixed(man.x, 1);
          } else if (man.x % 1 < 0.4) {
            man.x = this.parseToFixed(man.x, 0);
          }
        } else {
          if (man.y < 4 && ((man.y % 1 === 0 && this.props.maps[man.y + 1][man.x] === 'lawn') || man.y % 1 !== 0)) {
            man.y = this.parseToFixed(man.y, 1);
          }
        }
        node.style.webkitAnimation = 'down 0.25s steps(1, end) 1';
        break
      default:
        break
    }
    this.setState({
      man,
    })
  }

  componentDidMount() {
    let [man, node] = [this, findDOMNode(this.refs.man)];
    // 键盘按下事件
    document.addEventListener('keydown', function (e) {
      moveFlag = e.keyCode;
    })
    // 键盘抬起事件
    document.addEventListener('keyup', function (e) {
      moveFlag = -1;
    })
    // 动画结束事件
    node.addEventListener('webkitAnimationEnd', function () {
      node.style.webkitAnimation = '';
    }, false);
    // 循环播放
    this.timer = setInterval(function () {
      man.move(moveFlag);
    }, 100);
  }

  render() {
    const { x, y, type } = man
    const [left, top] = [x * side, y * side]
    return (
      <div
        ref='man'
        style={{ left, top }}
        className={`man man-${type}`}
      />
    );
  }
}

export default Man;
