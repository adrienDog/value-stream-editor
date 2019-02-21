import React, { Component } from 'react';
import Slider from '@material-ui/lab/Slider';

export default class TreeDepthPicker extends Component {

  render() {
    console.log('TreeDepthPicker props', this.props);
    return (
      <Slider
        min={0}
        max={9}
        step={1}
        value={this.props.value}
        valueReducer={(v) => this.props.onChange(Math.round(v))}
      />
    );
  }
}
