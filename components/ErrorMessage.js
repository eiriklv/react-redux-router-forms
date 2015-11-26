import React, { Component, PropTypes } from 'react';

export default class ErrorMessage extends Component {
  render() {
    const { error } = this.props;

    return (
      <div>Error: {error}</div>
    );
  }
}
