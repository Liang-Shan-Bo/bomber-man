import React, { Component } from 'react';
import Map from './components/Map';
import Man from './components/Man';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Map/>
        <Man/>
      </div>
    );
  }
}

export default App;
