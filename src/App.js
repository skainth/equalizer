import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import eqs from './fixtures/eqs';
import EqualizerContainer from './containers/EqualizerContainer';
import Visualizer from './components/Visualizer';

const MIN = -12, MAX = 12;
class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.onEqChange = this.onEqChange.bind(this);
  }
  onEqChange(eq){
    this.setState({eq});
  }
  render() {
    const {eq} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Equalizer Demo</h1>
        </header>
        <div className="App-intro">
          <EqualizerContainer eqs={eqs} min={MIN} max={MAX} onEqChange={this.onEqChange}/>
          <Visualizer eq={eq} min={MIN} max={MAX}/>
        </div>
      </div>
    );
  }
}

export default App;
