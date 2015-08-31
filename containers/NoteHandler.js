import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Note from '../components/Note';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

import {
  populateSelectedNote,
  updateNote,
  saveNote
} from '../actions';

class NoteHandler extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSaveNote = ::this.handleSaveNote;
    this.handleRefreshNote = ::this.handleRefreshNote;
    this.handleUpdateNote = ::this.handleUpdateData;
  }

  componentDidMount() {
    this.handleRefreshData();
  }

  handleSaveNote() {
    const { saveData } = this.props;
    saveNote();
  }

  handleRefreshNote() {
    const { populateSelectedNote } = this.props;
    populateSelectedNote();
  }

  handleUpdateNote(id, field, event) {
    const { updateNote } = this.props;

    updateNote(id, {
      [field]: event.target.value
    });
  }

  render () {
    const {
      error,
      isLoading,
      note
    } = this.props;

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (isLoading) {
      return <LoadingSpinner />
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
  params: PropTypes.shape({
    id: PropTypes.number.isRequired
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
