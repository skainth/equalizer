import React, {Component} from 'react';
import './index.css'
import Slider from '../../components/SKSlider';

class EqualizerContainer extends Component {
  constructor(props){
    super(props);
    const {selectedEqIndex = 0} = props;
    const {eqs = []} = props;

    if(eqs[selectedEqIndex]){
      const selectedEq = eqs[selectedEqIndex];
      this.state = {selectedEq};
    }

    this.handleEqChange = this.handleEqChange.bind(this);
  }
  sliderChangeHandler(value, label){
    console.log(label, value);
  }
  handleEqChange(event){
    const selectedEqIndex = event.currentTarget.value;
    const selectedEq = this.props.eqs[selectedEqIndex];
    this.setState({selectedEq});
  }
  renderSliders(){
    const {selectedEq = {frequencies: []}} = this.state;
    const {min, max} = this.props;
    return (
      <div className='block'>
        {selectedEq.frequencies.map( ({value, label}, index) =>
          <Slider key={label} value={value} label={label} min={min} minLabel={`${min}db`} max={max} maxLabel={`+${max}db`} showRangeLabels={index === 0} onChange={this.sliderChangeHandler}/>)
        }
      </div>
    );
  }
  renderEqSelector(){
    const {eqs = []} = this.props;
    return (
      <div>
          {this.renderSliders()}
        <div className='block presetSelectorWrapper'>
          <label htmlFor='presetSelector'>Preset</label>
          <select id='presetSelector' onChange={this.handleEqChange}>
            {eqs.map((eq, index) => <option key={eq.name} value={index}>{eq.name}</option>)}
          </select>
        </div>
      </div>
    );
  }
  render(){
    return (
      <div>
        {this.renderEqSelector()}
      </div>
    );
  }
}

export default EqualizerContainer;

