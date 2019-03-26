import React, { Component } from 'react';

export default class Intro extends Component {

  render() {
    return (<div>
      <p>
        This is very basic MVP which is supposed to help teams work on their Value Streams.
        It is Work In Progress and does not support much for now.
        You can follow the project and give feedback <a href="https://github.com/adrienDog/value-stream-editor/projects/1">here</a>.
      </p>
      <p>
        The tree view is fed by the JSON editor underneath. Any local change is saved in your browser so reloading is safe.
        You can restore the default data or import/export the data as JSON.
      </p>
    </div>)
  }
}