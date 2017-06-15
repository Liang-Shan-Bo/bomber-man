import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import './style.css';

const side = 32;

class Fire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fier: {},
    }
  }

  deleteFire = () => {
    const { x, y, deleteFire } = this.props;
    deleteFire(x, y);
  }

  componentDidMount() {
    const node = findDOMNode(this.fire);
    let fire = this;
    // 动画
    node.style.webkitAnimation = 'blow-up 1s steps(1, end) 1 forwards';
    //动画结束时事件 
    node.addEventListener('webkitAnimationEnd', function () {
      fire.deleteFire();
    }, false);
  }

  render() {
    const { x, y } = this.props
    const [left, top] = [x * side, y * side]
    return (
      <div
        ref={fire => this.fire = fire}
        style={{ left, top }}
        className={`fire`}
      />
    );
  }
}

export default Fire;
