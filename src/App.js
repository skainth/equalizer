import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import eqs from './fixtures/eqs';
import EqualizerContainer from './containers/EqualizerContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Equalizer Demo</h1>
        </header>
        <div className="App-intro">
          <EqualizerContainer eqs={eqs} min={-12} max={12} />
        </div>
      </div>
    );
  }
}

export default App;
