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

class SecondPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSaveData = ::this.handleSaveData;
    this.handleRefreshData = ::this.handleRefreshData;
    this.handleUpdateData = ::this.handleUpdateData;
  }

  componentDidMount() {
    this.handleRefreshData();
  }

  handleSaveData() {
    const { saveData } = this.props;
    saveData();
  }

  handleRefreshData() {
    const { populateData } = this.props;
    populateData();
  }

  handleUpdateData(field, event) {
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
        refresh={this.handleRefreshData}
        save={this.handleSaveData}
        update={this.handleUpdateData}
      />
    );
  }
}

SecondPage.propTypes = {
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
)(SecondPage);
