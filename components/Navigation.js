import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Navigation extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to={`/firstform/eirik`}>First Form</Link></li>
          <li><Link to={`/secondform/eirik`}>Second Form</Link></li>
        </ul>
      </nav>
    );
  }
}
