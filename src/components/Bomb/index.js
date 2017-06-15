import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import './style.css';

const side = 32;

class Bomb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bomb: {},
    }
  }

<<<<<<< HEAD
  deleteBomb = () => {
    const { x, y, deleteBomb } = this.props;
    deleteBomb(x, y);
  }

  blowUp = () => {
    const { x, y, power, blowUp } = this.props;
    blowUp(x, y, power);
=======
  deleteBomb = node => {
    switch (node.style.animationName) {
        case 'ready':
          node.style.webkitAnimation = 'blow-up 1s steps(1, end) 1 forwards';
          break;
        default:
          this.props.deleteBomb();
          break;
      }
>>>>>>> origin/master
  }

  componentDidMount() {
    const node = findDOMNode(this.bomb);
    // 生成雷之后开始播放准备爆炸动画
    node.style.webkitAnimation = 'ready 1s steps(1, end) 5';
    //动画结束时事件 
<<<<<<< HEAD
    node.addEventListener('webkitAnimationEnd', function () {
      bomb.blowUp();
      bomb.deleteBomb();
    }, false);
=======
    node.addEventListener('webkitAnimationEnd', this.deleteBomb.bind(this, node), false);
>>>>>>> origin/master
  }

render() {
  const { x, y } = this.props
  const [left, top] = [x * side, y * side]
  return (
    <div
      ref={bomb => this.bomb = bomb}
      style={{ left, top }}
      className={`bomb`}
    />
  );
}
}

export default Bomb;
