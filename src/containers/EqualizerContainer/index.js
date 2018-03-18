import React, {PureComponent} from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './index.css'
import Slider from '../../components/SKSlider';
import {deepClone} from "../../utils";

class EqualizerContainer extends PureComponent {
  constructor(props){
    super(props);
    const {selectedEqIndex = 0} = props;
    const {eqs = []} = props;

    if(eqs[selectedEqIndex]){
      const selectedEq = eqs[selectedEqIndex];
      this.state = {selectedEq};
    }

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.sliderChangeHandler = this.sliderChangeHandler.bind(this);
  }
  componentDidMount(){
    this.notifyEqChange();
  }
  notifyEqChange(){
    const {selectedEq} = this.state;
    const {onEqChange} = this.props;
    onEqChange && onEqChange(selectedEq);
  }
  sliderChangeHandler(value, label){
    this.setState((prevState) => {
      const {selectedEq} = prevState;
      const newSelectedEq = deepClone(selectedEq);

      const frequencyToUpdate = newSelectedEq.frequencies.find((frequency => frequency.label === label));
      frequencyToUpdate.value = value;
      newSelectedEq.name = 'Custom';

      return {selectedEq: newSelectedEq};
    }, () => {
      this.notifyEqChange();
    })
  }
  handleDropdownChange(selectedOption){
    const selectedEq = this.props.eqs.find(eq => eq.name === selectedOption.value);

    this.setState({selectedEq}, () => {
      this.notifyEqChange();
    });
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
    const options = eqs.map(({name}) => ({label: name, value: name}));
    const {selectedEq = {}} = this.state;
    const selectedOption = {label: selectedEq.name, value: selectedEq.name};

    return (
      <div>
        {this.renderSliders()}
        <div className='block presetSelectorWrapper'>
          <label htmlFor='presetSelector'>Preset</label>
          <Dropdown id='presetSelector' options={options} onChange={this.handleDropdownChange} value={selectedOption} />
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

