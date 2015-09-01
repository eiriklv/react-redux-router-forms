import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Note from '../components/Note';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import NotFound from '../components/NotFound';

import {
  populateSelectedNote,
  updateNote,
  saveNote
} from '../actions/selected-note-actions';

class NoteHandler extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSaveNote = ::this.handleSaveNote;
    this.handleRefreshNote = ::this.handleRefreshNote;
    this.handleUpdateNote = ::this.handleUpdateNote;
  }

  componentDidMount() {
    this.handleRefreshNote();
  }

  handleSaveNote() {
    const { saveNote } = this.props;
    saveNote();
  }

  handleRefreshNote() {
    const {
      populateSelectedNote,
      params
    } = this.props;

    populateSelectedNote(params.id);
  }

  handleUpdateNote(note) {
    const { updateNote } = this.props;
    updateNote(note);
  }

  render () {
    const {
      error,
      isLoading,
      isSaving,
      unsavedChanges,
      note
    } = this.props;

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (isLoading) {
      return <LoadingSpinner />
    }

    if (!note.id) {
      return <NotFound />
    }

    return (
      <Note
        note={note}
        isSaving={isSaving}
        unsavedChanges={unsavedChanges}
        refresh={this.handleRefreshData}
        save={this.handleSaveNote}
        update={this.handleUpdateNote}
      />
    );
  }
}

NoteHandler.propTypes = {
  populateSelectedNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
};

function mapStateToProps(state) {
  return state.selectedNote
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    populateSelectedNote,
    saveNote,
    updateNote
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteHandler);
