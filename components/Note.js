import React, { Component, PropTypes } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default class Note extends Component {
  componentDidUpdate() {
    const {
      save,
      isSaving,
      unsavedChanges
    } = this.props;

    if (!isSaving && unsavedChanges) {
      clearTimeout(this._saveTimeout);
      this._saveTimeout = setTimeout(save, 500);
    }
  }

  render() {
    const {
      save,
      update,
      refresh,
      note,
      isSaving,
      isLoading,
      unsavedChanges
    } = this.props;

    if (isLoading) {
      return <LoadingSpinner />
    }

    return (
      <div>
        <h1>
          {Note}
          {unsavedChanges && (
            <span> (*)</span>
          )}
          {isSaving && (
            <span> (saving..)</span>
          )}
        </h1>

        <div>
          <label htmlFor=''>Subject: </label>
          <input
            id='subject'
            name='subject'
            type='text'
            value={note.subject}
            onChange={update.bind(null, 'subject')}
          />
        </div>
        <div>
          <label htmlFor=''>Content: </label>
          <input
            id='content'
            name='content'
            type='text'
            value={note.content}
            onChange={update.bind(null, 'content')}
          />
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  isSaving: PropTypes.bool,
  isLoading: PropTypes.bool,
  unsavedChanges: PropTypes.bool,
  save: PropTypes.func,
  update: PropTypes.func,
  refresh: PropTypes.func,
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
};

Note.defaultProps = {
  isSaving: false,
  isLoading: false,
  unsavedChanges: false,
  save: (() => { console.log('no save method provided') }),
  update: (() => { console.log('no update method provided') }),
  refresh: (() => { console.log('no refresh method provided') }),
  note: {
    id: 0,
    subject: 'abc',
    content: 'dsfdghjh'
  }
};
