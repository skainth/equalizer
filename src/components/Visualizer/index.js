import React, {Component} from 'react';
import './index.css';

class Visualizer extends Component{
  constructor(props){
    super(props);
    this.state = {animProps: [128, 128, 128, 128, 20]};
  }
  componentWillReceiveProps(nextProps){
    const {eq = {frequencies:[]}, max, min} = nextProps;
    const animProps = [];
    for(let index = 0; index < eq.frequencies.length; index ++){
      const frequency = eq.frequencies[index];
      const value = frequency.value;

      const percentage = (value - min) / (max - min);
      animProps[index] = percentage * 255;
    }
    this.setState({animProps});
  }
  render(){
    const {eq} = this.props;
    if(!eq){
      return null;
    }

    const {animProps} = this.state;
    const side = '100px';
    const width = `${animProps[4] * 100 / 255}%`;
    const backgroundColor = `rgba(${animProps[0]}, ${animProps[1]}, ${animProps[2]}, ${animProps[3] / 255})`;
    return (
      <div>
        <div style={{width, height: side, backgroundColor}} className='visualizer'>
          <div>{eq.name}</div>
        </div>
      </div>
    );
  }
}

export default Visualizer;