import React, { Component } from 'react';
import style from './index.component.scss';
import imagesList from '../../assets/data/imagesList.json';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.intId = null;
    this.state = {
      link: imagesList[0].src,
      index: 0,
      delay: 1,
      isStart: false,
      isFullScreen: false,
    };
  }

  nextBtnHandler = () => {
    let index =
      this.state.index + 1 < imagesList.length ? this.state.index + 1 : 0;
    console.log(`index is ${index}`);
    this.setState({ link: imagesList[index].src, index: index });
  };

  prevBtnHandler = () => {
    let index =
      this.state.index <= 0 ? imagesList.length - 1 : this.state.index - 1;
    console.log(`index is ${index}`);
    this.setState({ link: imagesList[index].src, index: index });
  };

  sliderStart = () => {
    this.setState({ isStart: true });
    this.intId = setInterval(this.nextBtnHandler, this.state.delay * 1000);
  };

  sliderStop = () => {
    clearInterval(this.intId);
    this.setState({ isStart: false });
  };

  upDelay = () => {
    this.setState({ delay: this.state.delay + 1 });
  };

  downDelay = () => {
    if (this.state.delay > 1) this.setState({ delay: this.state.delay - 1 });
  };

  classes = () => {
    if (this.state.isFullScreen) return 'slider full';
    else return 'slider';
  };

  render() {
    const { link, delay, isStart } = this.state;
    console.log(this.state.delay);
    return (
      <div className={this.classes()}>
        <div onClick={this.prevBtnHandler} className={'btn btn_prev'}>
          {'<'}
        </div>
        <img src={this.state.link}></img>
        <div onClick={this.nextBtnHandler} className={'btn btn_next'}>
          {'>'}
        </div>
        <div className={'control'}>
          <div onClick={!isStart ? this.sliderStart : null}>start</div>
          <div onClick={this.sliderStop}>stop</div>
          <div className={'delayChose'}>
            <div onClick={this.downDelay}>-</div>
            <div>{delay}s</div>
            <div onClick={this.upDelay}>+</div>
            <div
              onClick={() => {
                this.setState({
                  isFullScreen: !this.state.isFullScreen,
                });
              }}
            >
              fullScreen
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;
