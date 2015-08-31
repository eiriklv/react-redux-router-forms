import { combineReducers } from 'redux';
import _ from 'lodash';

import {
  POPULATE_INBOX_PENDING,
  POPULATE_INBOX_SUCCESS,
  POPULATE_INBOX_ERROR,
  POPULATE_SELECTED_NOTE_PENDING,
  POPULATE_SELECTED_NOTE_SUCCESS,
  POPULATE_SELECTED_NOTE_ERROR,
  SAVE_NOTE_PENDING,
  SAVE_NOTE_SUCCESS,
  SAVE_NOTE_ERROR,
  DELETE_NOTE_PENDING,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
  UPDATE_NOTE_SUCCESS
} from '../actions';

const defaultSelectedNoteState = {
  error: null,
  isLoading: false,
  isSaving: false,
  unsavedChanges: false,
  note: {
    id: 0,
    subject: 'default',
    content: 'default'
  }
};

const defaultInboxState = {
  error: null,
  isLoading: false,
  notes: []
};

function inbox(state = defaultInboxState, action) {
  switch (action.type) {
    case POPULATE_INBOX_PENDING:
      return _.assign({}, state, {
        isLoading: true
      });
    case POPULATE_INBOX_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        error: null,
        notes: action.notes
      });
    case POPULATE_INBOX_ERROR:
      return _.assign({}, state, {
        error: action.error,
      });
    case DELETE_NOTE_PENDING:
      return state;
    case DELETE_NOTE_SUCCESS:
      return state;
    case DELETE_NOTE_ERROR:
      return state;

    default:
      return state;
  }
}

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
        note: action.note
      });
    case POPULATE_SELECTED_NOTE_ERROR:
      return _.assign({}, state, {
        error: action.error,
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
        error: action.error,
      });
    case UPDATE_NOTE_SUCCESS:
      return _.assign({}, state, {
        unsavedChanges: true,
        note: _.assign({}, state.note, action.update)
      });

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  inbox,
  selectedNote
});

export default rootReducer;
