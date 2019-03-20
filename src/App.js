import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ValueStreamEditor from './components/ValueStreamEditor';
import TreeView from './components/TreeView';
import valueStreamStore from './services/ValueStreamStore';
import ImportJson from './components/ImportJson';
import ExportJson from './components/ExportJson';
import TreeViewOptions from './components/TreeViewOptions';
import Intro from './components/Intro';

import DEFAULT_JSON from './value-stream.json';

class App extends Component {
  constructor(props) {
    super(props);

    // should get initial from localStorage OR default
    this.state = {
      jsonData: undefined,
      treeViewOptions: {
        depth: 2,
      },
    }
  }

  componentDidMount() {
    valueStreamStore.get().then((jsonData) => {
      if (jsonData) {
        console.info('using jsonData from local storage');
        this.setState({ jsonData });
      } else {
        console.info('using default jsonData');
        this.setState({ jsonData: DEFAULT_JSON });
      }
    });
  }

  onTreeDepthChange(value) {
    this.setState({
      treeViewOptions: {
        depth: value,
      },
    });
  }

  async onValueStreamChange(jsonData) {
    // TEMP: should be reacting to state change
    await valueStreamStore.save(jsonData);
    this.setState({ jsonData });
  }

  handleJsonImport(jsonData) {
    console.log('jsonData from file', jsonData);
    this.setState({ jsonData });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Value Stream Editor</h1>
        </header>

        <div className="container">
          <section>
            <Intro/>
          </section>
        </div>

        { this.state.jsonData &&  <div className="container">
          <section>
            <h2>Value stream graph</h2>
            <p>Click on the nodes to dive deeper or adjust the depth with the slider.</p>
            <TreeViewOptions depth={{value: this.state.treeViewOptions.depth, onChange: (v) => this.onTreeDepthChange(v) }}/>
            { this.state.jsonData &&
              <TreeView jsonData={this.state.jsonData} initialDepth={this.state.treeViewOptions.depth} zoom={0.7}/>
            }
          </section>

          <section className="container"
            style={{
              padding: '10px 0'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: '10px 0'
              }}
            >
              <h2 style={{ flex: '1' }}>
                Edit JSON
              </h2>
              <div style={{ flex: '1' }}>
                <h3>Import .json</h3>
                <ImportJson onFileReady={(f) => this.handleJsonImport(f)}/>
              </div>
              <div style={{ flex: '1' }}>
                <h3>Export .json</h3>
                <ExportJson jsonData={this.state.jsonData} fileName={'value-stream'}/>
              </div>


            </div>
            <ValueStreamEditor
              jsonData={this.state.jsonData}
              onChange={(e) => this.onValueStreamChange(e.dataPoint)}
            />
          </section>
        </div>}
      </div>
    );
  }
}

export default App;
