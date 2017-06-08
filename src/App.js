import React, { Component } from 'react';
import Map from './components/Map';
import './App.css';

class App extends Component {

  state = {
    maps: ['lawn', 'wall', 'lawn', 'lawn', 'lawn', 'power', 'wall', 'lawn','lawn',
           'lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron','lawn',
           'wall', 'lawn', 'lawn', 'wall', 'lawn', 'lawn', 'wall', 'lawn','lawn',
           'lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron', 'lawn', 'iron','lawn',
           'lawn', 'lawn', 'lawn', 'lawn', 'wall', 'lawn', 'wall', 'lawn','door']
  }

  componentDidMount() {
  }

  render() {
    const { maps } = this.state;
    return (
      <div>
        {maps.map((type, i) => <Map key={i} index={i} type={type} />)}
      </div>
    );
  }
}

export default App;
