import React, { Component } from 'react';
import download from 'downloadjs';

export default class ExportJson extends Component {

  onExportClick() {
    download(
      JSON.stringify(this.props.jsonData, null, 2),
      `${this.props.fileName}.json`,
      "text/json"
    );
  }

  render() {
    console.log('this.props', this.props);
    return (
      <div>
        <button onClick={() => this.onExportClick()}>Export JSON</button>
      </div>
    )
  }
}
