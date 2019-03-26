import React from 'react';
import Tree from 'react-d3-tree';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function hasChildren(obj) {
  return obj._children && obj._children.length;
}

const scoreToColor = [
  'red',
  'red',
  'orange',
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

const Small = ({children}) => (
  <small style={{fontSize: '0.6em'}}>
    {children}
  </small>
);

function shouldShowExpandedView(nodeData) {
  const attrs = nodeData.attributes;
  return !hasChildren(nodeData) || (!nodeData._collapsed && !isEmpty(attrs));
}

class NodeLabel extends React.PureComponent {
  render() {
    const {className, nodeData} = this.props;
    const attrs = nodeData.attributes;
    return (
      <div className={className}>
        <h4 style={{ fontSize: '1.3vmin', padding: '0', margin: '0', color: color(attrs)}}>{nodeData.name}</h4>
        { shouldShowExpandedView(nodeData) &&
          <p style={{margin: 0, padding: 0}}>
            {attrs.notes && <Small>{attrs.notes}</Small>}
            {attrs.links && 
              <Small>{attrs.links.map((l,i) => <a key={i} href={l.url}>{l.label}</a>)}</Small>
            }
          </p>
        }
      </div>
    )
  }
}

export default class TreeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialDepth: props.initialDepth,
      refreshing: false,
    }
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: 20,
        y: dimensions.height / 2
      }
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.initialDepth === state.initialDepth) {
      console.log('props and state have same depth, state:', state);
      return state.refreshing ? {...state, refreshing: false} : null
    } else if (!state.refreshing) {
      console.log('props and state have DIFFERENT depth, state:', state);
      return { ...state, refreshing: true, initialDepth: props.initialDepth};
    } else {
      return { ...state, refreshing: false};
    }
  }

  render() {
    console.log('TreeView this.props.initialDepth', this.props.initialDepth);
    console.log('TreeView this.state.initialDepth', this.state.initialDepth);
    console.log('TreeView this.state.refreshing', this.state.refreshing);
    /* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */
    return (
      <div
        id="treeWrapper"
        ref={tc => (this.treeContainer = tc)}
        style={{width: '100%', height: '40em', border: 'solid #d3d3d3 1px'}}
      >
        {!this.state.refreshing && <Tree
          data={this.props.jsonData}
          translate={this.state.translate}
          onClick={(e) => console.log(e)}
          initialDepth={this.state.initialDepth}
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
        />}

      </div>
    );
  }
}
