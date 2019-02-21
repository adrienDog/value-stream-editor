import React from 'react';

import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';

class JSONEditor extends React.Component {
  constructor(props) {
    super(props);

    this.onJsonChanged = this.onJsonChanged.bind(this);
  }

  onJsonChanged(editorContent) {
    this.props.onChange({ target: { value: editorContent.jsObject } });
  }

  style() {
    const style = {
      maxHeight: this.props.maxHeight || null,
      width:"100%",
      overflow:"auto",
    };
    if (this.props.maxWidth) style.maxWidth = this.props.maxWidth;

    return style;
  }

  render() {
    return (
      <div style={this.style()}>
        <JSONInput
          placeholder = { this.props.initialJson }
          // colors      = { darktheme }
          locale = { locale }
          width = {"100%"}
          viewOnly = { this.props.viewOnly === true }
          onChange={this.onJsonChanged}
        />
      </div>
    )
  }
}

export default JSONEditor;
