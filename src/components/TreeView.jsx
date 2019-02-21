import React from 'react';
import Tree from 'react-d3-tree';

class NodeLabel extends React.PureComponent {
  render() {
    const {className, nodeData} = this.props
    return (
      <div className={className}>
        <h4 style={{ fontSize: '1.3vmin', padding: '0', margin: '0'}}>{nodeData.name}</h4>
        { nodeData.attributes.length && <pre>
            {JSON.stringify(nodeData.attributes, null, 2)}
          </pre>
        }
        {/* {nodeData._children &&
          <button>{nodeData._collapsed ? 'Expand' : 'Collapse'}</button>
        } */}
      </div>
    )
  }
}

export default class TreeView extends React.Component {
  render() {
    /* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */
    return (
      <div id="treeWrapper" style={{width: '100%', height: '40em', border: 'solid #d3d3d3 1px'}}>

        <Tree
          data={this.props.jsonData}
          onClick={(e) => console.log(e)}
          initialDepth={this.props.initialDepth}
          nodeSize={{x: 200, y: 100}}
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
