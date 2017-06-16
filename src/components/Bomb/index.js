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

  deleteBomb = () => {
    const { x, y, deleteBomb } = this.props;
    deleteBomb(x, y);
  }

  blowUp = () => {
    const { x, y, power, blowUp } = this.props;
    blowUp(x, y, power);
  }

  componentDidMount() {
    const node = findDOMNode(this.bomb);
    let bomb = this;
    // 生成雷之后开始播放准备爆炸动画
    node.style.webkitAnimation = 'ready 1s steps(1, end) 5';
    //动画结束时事件 
    node.addEventListener('webkitAnimationEnd', function () {
      bomb.deleteBomb();
      bomb.blowUp();
    }, false);
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
