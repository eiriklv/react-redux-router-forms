import {
  getNoteById,
  getInbox,
  deleteNoteById,
  updateNoteById,
  createNewNote
} from '../services/api';

export const POPULATE_SELECTED_NOTE_PENDING = 'POPULATE_SELECTED_NOTE_PENDING';
export const POPULATE_SELECTED_NOTE_SUCCESS = 'POPULATE_SELECTED_NOTE_SUCCESS';
export const POPULATE_SELECTED_NOTE_ERROR = 'POPULATE_NOTELIST_ERROR';

export const SAVE_NOTE_PENDING = 'SAVE_NOTE_PENDING';
export const SAVE_NOTE_SUCCESS = 'SAVE_NOTE_SUCCESS';
export const SAVE_NOTE_ERROR = 'SAVE_NOTE_ERROR';

export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';

function populateSelectedNotePending() {
  return {
    type: POPULATE_SELECTED_NOTE_PENDING
  };
}

function populateSelectedNoteSuccess(note) {
  return {
    type: POPULATE_SELECTED_NOTE_SUCCESS,
    payload: { note }
  };
}

function populateSelectedNoteError(error) {
  return {
    type: POPULATE_SELECTED_NOTE_ERROR,
    payload: { error }
  };
}

function saveNotePending() {
  return {
    type: SAVE_NOTE_PENDING
  };
}

function saveNoteSuccess() {
  return {
    type: SAVE_NOTE_SUCCESS
  };
}

function saveNoteError(error) {
  return {
    type: SAVE_NOTE_ERROR,
    payload: { error }
  };
}

function updateNoteSuccess(note) {
  return {
    type: UPDATE_NOTE_SUCCESS,
    payload: { note }
  };
}

export function populateSelectedNote(id) {
  return (dispatch) => {
    dispatch(populateSelectedNotePending());

    return getNoteById(id)
      .then((note) => dispatch(populateSelectedNoteSuccess(note)))
      .catch((error) => dispatch(populateSelectedNoteError(error)))
  }
}

export function saveNote() {
  return (dispatch, getState) => {
    let note = getState().selectedNote.note;
    let { id } = note;

    dispatch(saveNotePending());

    return updateNoteById(id, note)
      .then(() => dispatch(saveNoteSuccess()))
      .catch((error) => dispatch(saveNoteError(error)))
  }
}

export function updateNote(note) {
  return (dispatch) => {
    dispatch(updateNoteSuccess(note));
  }
}
