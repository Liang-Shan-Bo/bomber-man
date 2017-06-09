import React, { Component } from 'react';
import './style.css';

const side = 32;
let man = { x: 0, y: 0, type: 'left' };

class Man extends Component {
  state = {
    man: man
  }

  // 移动
  move = (key) => {
    switch (key) {
      case 38:
        // 上
        man.y--;
        break
      case 37:
        //左
        man.x--;
        break
      case 39:
        // 右
        man.x++;
        break
      case 40:
        // 下
        man.y++;
        break
      default:
        break
    }
    this.setState({
      man: man
    })
  }

  componentDidMount() {
    let man = this;
    document.addEventListener('keyup', function (e) {
      man.move(e.keyCode);
    })
  }

  render() {
    const { x, y, type } = man
    const [left, top] = [x * side, y * side]
    return (
      <div
        style={{ left, top }}
        className={`man man-${type}`}
      />
    );
  }
}

export default Man;
