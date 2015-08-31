import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Home from '../components/Home';

class App extends Component {
  handleChange(nextValue) {
    // Available thanks to contextTypes below
    const { history } = this.context;
    history.pushState(`/${nextValue}`);
  }

  render() {
    // Injected by React Router
    const { location, children } = this.props;
    const { pathname } = location;
    const value = pathname.substring(1);

    return (
      <div>
        <Navigation />
        {children || <Home />}
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
