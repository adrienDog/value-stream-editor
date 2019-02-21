import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ValueStreamEditor from './components/ValueStreamEditor';
import TreeView from './components/TreeView';
import valueStreamStore from './services/ValueStreamStore';
import ImportJson from './components/ImportJson';
import ExportJson from './components/ExportJson';
import DEFAULT_JSON from './value-stream-default.json';

class App extends Component {
  constructor(props) {
    super(props);

    // should get initial from localStorage OR default
    this.state = {
      jsonData: undefined,
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
        </header>

        { this.state.jsonData &&  <div className="container">
          <section>
            { this.state.jsonData &&
              <TreeView jsonData={this.state.jsonData} initialDepth={3}/>
            }
          </section>

          <section className="container"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              padding: '10px 0'
            }}
          >
            <div style={{ flex: '1' }}>
              <ImportJson onFileReady={(f) => this.handleJsonImport(f)}/>
            </div>
            <div style={{ flex: '1' }}>
              <ExportJson jsonData={this.state.jsonData} fileName={'value-stream'}/>
            </div>
          </section>

          <section style={{ maxHeight: '200px' }}>
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
