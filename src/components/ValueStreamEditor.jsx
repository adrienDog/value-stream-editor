import React, {Component} from 'react';
import PropTypes from 'prop-types';
import JSONEditor from './JSONEditor';

class ValueStreamEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataPoint: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(what) {
    return (event) => {
      this.props.onChange({[what]: event.target.value});
    }
  }

  componentWillUnmount() {
    this.props.onChange(this.state);
  }

  render() {
    return (
      <JSONEditor
        maxHeight={"100%"}
        initialJson={this.props.jsonData}
        onChange={this.handleChange('dataPoint')}
      />
    );
  }
}

ValueStreamEditor.propTypes = {
  onChange: PropTypes.func,
};

export default ValueStreamEditor;
