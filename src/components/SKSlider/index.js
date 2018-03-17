import React, {PureComponent} from 'react';
import './index.css';

// The colors have and the corresponding ranges have been hard coded,
// but they can be easily coded as a prop

const COLORS = {LOW: {value: 0.4, color: '#ed5562'}, MEDIUM: {value: 0.7, color: '#f5f55f'}, HIGH: {color: '#17a086'}};
const HANDLE_EDGE = {TOP: -8, BOTTOM: 90};

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
    this.onMouseMoveOnSlider = this.onMouseMoveOnSlider.bind(this);

    this.state = {handleTop: 0, min, max, sliderValue};
  }
  componentDidMount(){
    this.updateSliderValue(this.props);
  }
  getSliderColor(percentage){
    let sliderColor;
    if(percentage < COLORS.LOW.value){
      sliderColor = COLORS.LOW.color;
    }else{
      if(percentage < COLORS.MEDIUM.value){
        sliderColor = COLORS.MEDIUM.color;
      }else{
        sliderColor = COLORS.HIGH.color;
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

    const sliderColor = this.getSliderColor(percentage);
    this.setState({handleTop, sliderColor});
  }
  componentWillReceiveProps(nextProps){
    this.updateSliderValue(nextProps);
  }
  updateSlider(event){
    const {min, max, onChange, label} = this.props;
    const {handle} = this;
    const elem = this.slider;
    const elemOffset = elem.offsetParent.offsetTop;
    const clickedAtY = event.clientY;
    const diff = clickedAtY - elemOffset;
    const elemHeight = elem.clientHeight;
    const handleHeight = handle.clientHeight;
    let handleTop = (diff - handleHeight/2) * 100 / elemHeight;

    // Limit the values of the handle's top.
    // This may be an issue while dragging the handle at the edges
    if(handleTop < HANDLE_EDGE.TOP)
      handleTop = HANDLE_EDGE.TOP;
    if(handleTop > HANDLE_EDGE.BOTTOM)
      handleTop = HANDLE_EDGE.BOTTOM;

    const percentage = diff / elemHeight;

    const sliderValue = Math.floor(min + (max - min) * percentage);

    const sliderColor = this.getSliderColor(percentage);
    if(onChange && this.state.sliderValue !== sliderValue){
      onChange(sliderValue, label);
    }

    this.setState({handleTop, sliderValue, sliderColor});
  }
  onMouseMoveOnSlider(event){
    // event.buttons is not available on Safari, hence using event.nativeEvent.which
    // https://github.com/facebook/react/issues/7122
    const isPrimaryButtonCliced = (event.buttons === 1 || event.nativeEvent.which === 1);

    if(event.target === this.handle && isPrimaryButtonCliced){
      this.updateSlider(event)
    }
  }
  onSliderClick(event){
    this.updateSlider(event);
  }

  render(){
    const {handleTop, sliderColor} = this.state;
    const {min, max, showRangeLabels, label} = this.props;
    const {minLabel = min, maxLabel = max} = this.props;
    return (
      <div className='slider-wrapper'>
        <div className='sliderContainer'>
          <div className='slider'
               onClick={this.onSliderClick}
               style={{backgroundColor: sliderColor}}
               ref={elem => {this.slider = elem;}}
               onMouseMove={this.onMouseMoveOnSlider}
          >
            <div className='handle'
                 ref={elem => this.handle = elem}
                 style={{top: `${handleTop}%`}}
            >
            </div>
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
