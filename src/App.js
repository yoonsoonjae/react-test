import './App.css';
import React, { Component } from 'react';
import AirQuality from './components/AirQuality/AirQuality';
import Pollution from './components/Pollution/Pollution';


class App extends Component {

  render(){
    return (
    <div>
      <AirQuality />
      <Pollution />
    </div>
  );
  }
}
export default App;
