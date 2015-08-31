import React, { Component, PropTypes } from 'react';

class NoteListElement extends Component {
  render () {
    const {
      id,
      subject,
      deleteNote
    } = this.props;

    return (
      <li>
        <span>id: {id} | </span>
        <span>subject: {} | </span>
        <span><button onClick={deleteNote}>Delete</button></span>
      </li>
    );
  }
}

NoteListElement.propTypes = {
  id: PropTypes.number.isRequired,
  subject: PropTypes.string.isRequired,
  deleteNote: PropTypes.func.isRequired
};

export default NoteListElement;
