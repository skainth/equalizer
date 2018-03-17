import React, {PureComponent} from 'react';
import './index.css';

class Slider extends PureComponent{
  constructor(props){
    super(props);

    const {min = 0, max = 10} = this.props;

    let sliderValue = this.props.value;

    if(this.props.value && (this.props.value >= min  && this.props.value <= max)){
      sliderValue = this.props.value;
    }else{
      sliderValue = min;
    }

    this.onSliderClick = this.onSliderClick.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
    this.onHandleMouseDown = this.onHandleMouseDown.bind(this);

    this.state = {handleTop: 0, min, max, sliderValue};
  }
  componentDidMount(){
    this.updateSliderValue(this.props);
  }
  getSliderColor(percentage){
    let sliderColor = 'red';
    if(percentage < 0.4){
      sliderColor = '#17a086';
    }else{
      if(percentage < 0.7){
        sliderColor = '#f5f54b63';
      }else{
        sliderColor = '#ed5562';
      }
    }
    return sliderColor;
  }
  updateSliderValue(props){

    const {min, max, value: sliderValue} = props;

    const {slider, handle} = this;
    const sliderHeight = slider.clientHeight;

    const handleHeight = handle.clientHeight;

    const percentage =  (sliderValue - min) / (max - min);
    const handleTop = (percentage * sliderHeight - handleHeight / 2) * 100 / sliderHeight;

    // console.log('percentage', percentage, 'handleTop', handleTop);

    const sliderColor = this.getSliderColor(percentage);
    this.setState({handleTop, sliderColor});
  }
  componentWillReceiveProps(nextProps){
    this.updateSliderValue(nextProps);
  }
  onSliderClick(event){
    const {min, max, onChange, label} = this.props;
    const {handle} = this;
    const elem = event.currentTarget;
    const elemOffset = elem.offsetParent.offsetTop;
    const clickedAtY = event.clientY;
    const diff = clickedAtY - elemOffset;
    const elemHeight = elem.clientHeight;
    const handleHeight = handle.clientHeight;
    const handleTop = (diff - handleHeight/2) * 100 / elemHeight;
    const percentage = diff / elemHeight;

    const sliderValue = Math.floor(min + (max - min) * percentage);

    // console.log('clickedAtY', clickedAtY, 'elemOffset', elemOffset, 'diff', diff, 'elemHeight', elemHeight, 'handleHeight', handleHeight, 'handleTop', handleTop);
    // console.log('min', min, 'max', max, 'percentage', percentage, 'sliderValue', sliderValue);

    const sliderColor = this.getSliderColor(percentage);
    if(onChange && this.state.sliderValue !== sliderValue){
      onChange(sliderValue, label);
    }

    this.setState({handleTop, sliderValue, sliderColor});
  }
  onHandleClick(event){
    event.stopPropagation();
    console.log('DISABLED clicks on handle');
  }
  onHandleMouseDown(event){
    console.log(event.clientY);
  }
  render(){
    const {handleTop, sliderColor} = this.state;
    const {min, max, showRangeLabels, label} = this.props;
    const {minLabel = min, maxLabel = max} = this.props;
    return (
      <div className='slider-wrapper'>
        <div className='sliderContainer'>
          <div className='slider' onClick={this.onSliderClick} style={{backgroundColor: sliderColor}} ref={elem => {this.slider = elem;}}>
            <div className='handle'
                 ref={elem => this.handle = elem}
                 onClick={this.onHandleClick}
                 onMouseDown={this.onHandleMouseDown}
                 style={{top: `${handleTop}%`}}
            ></div>
            {showRangeLabels && <div className='minLabelContainer'>{minLabel}</div>}
            {showRangeLabels && <div className='maxLabelContainer'>{maxLabel}</div>}
          </div>
        </div>
        <div className='slider-label'>{label}</div>
      </div>
    );
  }
}

export default Slider;
