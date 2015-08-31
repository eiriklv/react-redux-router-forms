import {
  getNoteById,
  getInbox,
  deleteNoteById,
  updateNoteById,
  createNewNote
} from '../services/api';

export const POPULATE_INBOX_PENDING = 'POPULATE_INBOX_PENDING';
export const POPULATE_INBOX_SUCCESS = 'POPULATE_INBOX_SUCCESS';
export const POPULATE_INBOX_ERROR = 'POPULATE_INBOX_ERROR';

export const POPULATE_SELECTED_NOTE_PENDING = 'POPULATE_SELECTED_NOTE_PENDING';
export const POPULATE_SELECTED_NOTE_SUCCESS = 'POPULATE_SELECTED_NOTE_SUCCESS';
export const POPULATE_SELECTED_NOTE_ERROR = 'POPULATE_NOTELIST_ERROR';

export const SAVE_NOTE_PENDING = 'SAVE_NOTE_PENDING';
export const SAVE_NOTE_SUCCESS = 'SAVE_NOTE_SUCCESS';
export const SAVE_NOTE_ERROR = 'SAVE_NOTE_ERROR';

export const CREATE_NOTE_PENDING = 'CREATE_NOTE_PENDING';
export const CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS';
export const CREATE_NOTE_ERROR = 'CREATE_NOTE_ERROR';

export const DELETE_NOTE_PENDING = 'DELETE_NOTE_PENDING';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
export const DELETE_NOTE_ERROR = 'DELETE_NOTE_ERROR';

export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';


function populateInboxPending() {
  return {
    type: POPULATE_INBOX_PENDING
  };
}

function populateInboxSuccess(notes) {
  return {
    type: POPULATE_INBOX_SUCCESS,
    notes
  };
}

function populateInboxError(error) {
  return {
    type: POPULATE_INBOX_ERROR,
    error
  };
}

function populateSelectedNotePending() {
  return {
    type: POPULATE_SELECTED_NOTE_PENDING
  };
}

function populateSelectedNoteSuccess(note) {
  return {
    type: POPULATE_SELECTED_NOTE_SUCCESS,
    note
  };
}

function populateSelectedNoteError(error) {
  return {
    type: POPULATE_SELECTED_NOTE_ERROR,
    error
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
    error
  };
}

function deleteNotePending(id) {
  return {
    type: DELETE_NOTE_PENDING,
    id
  };
}

function deleteNoteSuccess(id) {
  return {
    type: DELETE_NOTE_SUCCESS,
    id
  };
}

function deleteNoteError(error) {
  return {
    type: DELETE_NOTE_ERROR,
    id,
    error
  };
}

function createNotePending() {
  return {
    type: CREATE_NOTE_PENDING
  };
}

function createNoteSuccess(id) {
  return {
    type: CREATE_NOTE_SUCCESS,
    id
  };
}

function createNoteError(error) {
  return {
    type: CREATE_NOTE_ERROR,
    error
  };
}

function updateNoteSuccess(update) {
  return {
    type: UPDATE_NOTE_SUCCESS,
    update
  };
}

export function populateInbox() {
  return (dispatch) => {
    dispatch(populateInboxPending());
    return getInbox()
      .then((notes) => dispatch(populateInboxSuccess(notes)))
      .catch((error) => dispatch(populateInboxError(error)))
  }
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
    let id = note.id;

    dispatch(saveNotePending());
    return updateNoteById(id, note)
      .then(() => dispatch(saveNoteSuccess()))
      .catch((error) => dispatch(saveNoteError(error)))
  }
}

export function deleteNote(id) {
  return (dispatch, getState) => {
    dispatch(deleteNotePending());
    return deleteNoteById(id)
      .then(() => dispatch(deleteNoteSuccess(id)))
      .catch((error) => dispatch(deleteNoteError(error)))
  }
}

export function createNote(transitionTo) {
  return (dispatch, getState) => {
    dispatch(createNotePending());
    return createNewNote()
      .then((id) => {
        dispatch(createNoteSuccess(id))
        transitionTo(`/note/${id}`)
      })
      .catch((error) => dispatch(createNoteError(error)))
  }
}

export function updateNote(update) {
  return (dispatch) => {
    dispatch(updateNoteSuccess(update));
  }
}
