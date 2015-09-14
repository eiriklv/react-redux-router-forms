import _ from 'lodash';

import {
  POPULATE_SELECTED_NOTE_PENDING,
  POPULATE_SELECTED_NOTE_SUCCESS,
  POPULATE_SELECTED_NOTE_ERROR,
  SAVE_NOTE_PENDING,
  SAVE_NOTE_SUCCESS,
  SAVE_NOTE_ERROR,
  UPDATE_NOTE_SUCCESS
} from '../actions/selected-note-actions';

const defaultSelectedNoteState = {
  error: null,
  isLoading: false,
  isSaving: false,
  unsavedChanges: false,
  note: {}
};

function selectedNote(state = defaultSelectedNoteState, action) {
  switch (action.type) {
    case POPULATE_SELECTED_NOTE_PENDING:
      return _.assign({}, state, {
        isLoading: true
      });
    case POPULATE_SELECTED_NOTE_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        error: null,
        isSaving: false,
        unsavedChanges: false,
        note: action.payload.note
      });
    case POPULATE_SELECTED_NOTE_ERROR:
      return _.assign({}, state, {
        error: action.payload.error,
      });
    case SAVE_NOTE_PENDING:
      return _.assign({}, state, {
        isSaving: true,
        error: null
      });
    case SAVE_NOTE_SUCCESS:
      return _.assign({}, state, {
        isSaving: false,
        unsavedChanges: false
      });
    case SAVE_NOTE_ERROR:
      return _.assign({}, state, {
        error: action.payload.error,
      });
    case UPDATE_NOTE_SUCCESS:
      return _.assign({}, state, {
        unsavedChanges: true,
        note: _.assign({}, state.note, action.payload.note)
      });

    default:
      return state;
  }
}

export default selectedNote;
