import React, { Component, PropTypes } from 'react';
import LoadingSpinner from './LoadingSpinner';
import NoteForm from './NoteForm';

export default class Note extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSuccess = ::this.handleSuccess;
  }

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

  handleSuccess(data) {
    const { update } = this.props;
    update(data);
  }

  render() {
    const {
      save,
      update,
      refresh,
      note,
      isSaving,
      unsavedChanges
    } = this.props;

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

        <NoteForm
          initial={note}
          handleSuccess={this.handleSuccess}
        />
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
