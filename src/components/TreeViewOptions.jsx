import React, { Component } from 'react';
import TreeDepthPicker from './TreeDepthPicker';

export default class TreeViewOptions extends Component {
  render() {
    return (
      <div>
        <TreeDepthPicker {...this.props.depth}/>
      </div>
    );
  }
}
