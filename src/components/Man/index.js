import React, { Component } from 'react';
import { connect } from 'react-redux';
import {manMove} from '../../action';
import './style.css';

const side = 32;

class Man extends Component {

  // 移动
  move = ({keyCode}) => {
    const { man, dispatch} = this.props
    switch (keyCode) {
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
    dispatch(manMove(man))
  }

  componentDidMount() {
    document.addEventListener('keydown', this.move.bind(this))
  }

  render() {
    const { x, y, type } = this.props.man
    const [left, top] = [x * side, y * side]
    return (
      <div
        style={{ left, top }}
        className={`man man-${type}`}
      />
    );
  }
}

export default connect(
  state => ({man: state.man})
)(Man);
