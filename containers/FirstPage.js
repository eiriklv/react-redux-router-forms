import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MyForm from '../components/MyForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

import {
  populateData,
  saveData,
  updateData
} from '../actions';

class FirstPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.saveForm = ::this.saveForm;
    this.refreshFrom = ::this.refreshForm;
    this.updateForm = ::this.updateForm;
  }

  componentDidMount() {
    this.refreshForm();
  }

  saveForm() {
    const {
      isSaving,
      unsavedChanges,
      saveData
    } = this.props;

    if (!isSaving && unsavedChanges) {
      clearTimeout(this._saveTimeout);
      this._saveTimeout = setTimeout(() => {
        saveData();
      }, 500);
    }
  }

  refreshForm() {
    const { populateData } = this.props;
    populateData();
  }

  updateForm(field, event) {
    const { updateData } = this.props;

    updateData({
      [field]: event.target.value
    });
  }

  render () {
    if (this.props.error) {
      return <ErrorMessage error={this.props.error} />
    }

    if (this.props.isLoading) {
      return <LoadingSpinner />
    }

    return (
      <MyForm
        title='This is Form B'
        data={this.props.data}
        isSaving={this.props.isSaving}
        unsavedChanges={this.props.unsavedChanges}
        refresh={this.refreshForm}
        save={this.saveForm}
        update={this.updateForm}
      />
    );
  }
}

FirstPage.propTypes = {
  populateData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return state.formData
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    populateData,
    saveData,
    updateData
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstPage);
