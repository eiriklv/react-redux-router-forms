import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

class App extends Component {
  handleChange(nextValue) {
    // Available thanks to contextTypes below
    const { router } = this.context;
    router.transitionTo(`/${nextValue}`);
  }

  componentDidMount() {
    console.log('props:', this.props);
    console.log('context:', this.context);
  }

  render() {
    // Injected by React Router
    const { location, children } = this.props;
    const { pathname } = location;
    const value = pathname.substring(1);

    return (
      <div>
        <Navigation />
        {'This is the app'}
        {children}
        <Footer />
      </div>
    );
  }
}

App.contextTypes = {
  history: PropTypes.object.isRequired
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  params: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  children: PropTypes.node
};

function mapStateToProps(state) {
  return state.appData
}

export default connect(
  mapStateToProps
)(App);
