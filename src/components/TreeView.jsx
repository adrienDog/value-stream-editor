import React from 'react';
import Tree from 'react-d3-tree';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const scoreToColor = [
  'red',
  'red',
  'orange',
  'green',
  'green',
];

const color = (attributes) => {
  const score = attributes.score;
  if (score === undefined || score === null) {
    return 'black';
  }
  return scoreToColor[score];
}

class NodeLabel extends React.PureComponent {
  render() {
    const {className, nodeData} = this.props
    return (
      <div className={className}>
        <h4 style={{ fontSize: '1.3vmin', padding: '0', margin: '0', color: color(nodeData.attributes)}}>{nodeData.name}</h4>
        { !nodeData._collapsed && !isEmpty(nodeData.attributes) &&
          <pre>
            {JSON.stringify(nodeData.attributes, null, 2)}
          </pre>
        }
      </div>
    )
  }
}

export default class TreeView extends React.Component {
  state = {}

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 4,
        y: dimensions.height / 2
      }
    });
  }

  render() {
    /* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */
    return (
      <div
        id="treeWrapper"
        ref={tc => (this.treeContainer = tc)}
        style={{width: '100%', height: '40em', border: 'solid #d3d3d3 1px'}}
      >
        <Tree
          data={this.props.jsonData}
          translate={this.state.translate}
          onClick={(e) => console.log(e)}
          initialDepth={this.props.initialDepth}
          nodeSize={{x: 200, y: 100}}
          zoom={this.props.zoom}
          allowForeignObjects
          nodeLabelComponent={{
            render: <NodeLabel/>,
            foreignObjectWrapper: {
              y: 24
            }
          }}
          styles={{
            links: {
              strokeWidth: 1,
              stroke: '#d3d3d3',
              opacity: 0.8
            },
            node: {
              circle: {
                strokeWidth: 1,
                stroke: '#d3d3d3',
                fill: '#d3d3d3',
                opacity: 0.8
              },
            },
            leafNode: {
              circle: {
                strokeWidth: 1,
                stroke: '#d3d3d3',
                opacity: 0.8
              },
            },
          }}
        />

      </div>
    );
  }
}
