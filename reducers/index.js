import { combineReducers } from 'redux';
import _ from 'lodash';

import {
  POPULATE_DATA,
  POPULATE_DATA_SUCCESS,
  POPULATE_DATA_ERROR,
  SAVE_DATA,
  SAVE_DATA_SUCCESS,
  SAVE_DATA_ERROR,
  UPDATE_DATA
} from '../actions';

const defaultAppState = {};

const defaultFormState = {
  error: null,
  isLoading: false,
  isSaving: false,
  unsavedChanges: false,
  data: {
    firstname: '',
    lastname: '',
    message: ''
  }
};

function appData(state = defaultAppState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function formData(state = defaultFormState, action) {
  switch (action.type) {
    case POPULATE_DATA:
      return _.assign({}, state, {
        isLoading: true
      });
    case POPULATE_DATA_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        error: null,
        data: action.data
      });
    case POPULATE_DATA_ERROR:
      return _.assign({}, state, {
        error: action.error,
      });
    case SAVE_DATA:
      return _.assign({}, state, {
        isSaving: true,
        error: null
      });
    case SAVE_DATA_SUCCESS:
      return _.assign({}, state, {
        isSaving: false,
        unsavedChanges: false
      });
    case SAVE_DATA_ERROR:
      return _.assign({}, state, {
        error: action.error,
      });
    case UPDATE_DATA:
      return _.assign({}, state, {
        unsavedChanges: true,
        data: _.assign({}, state.data, action.update)
      });

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  appData,
  formData
});

export default rootReducer;
