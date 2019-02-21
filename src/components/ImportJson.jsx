import React, { Component } from 'react';

export default class ImportJson extends Component {
  constructor(props) {
    super(props);

    this.fileReader = new FileReader();
    this.state = {
      json: undefined,
    }

    this.handleSelectedFile = this.handleSelectedFile.bind(this);
  }

  componentDidMount() {
    this.fileReader.onload = (e) => this.onFileReaderResultLoaded();
  }

  onFileReaderResultLoaded() {
    const result = this.fileReader.result;
    console.log('result', result);
    const json = JSON.parse(result);
    this.props.onFileReady(json);
  }

  handleSelectedFile(e) {
    const selectedFile = e.target.files[0];
    this.fileReader.readAsText(selectedFile, 'UTF-8');
  }

  render() {
    return (
      <div>
        <input type="file" name="jsonFileImport" id="" onChange={this.handleSelectedFile} />
      </div>
    )
  }
}
