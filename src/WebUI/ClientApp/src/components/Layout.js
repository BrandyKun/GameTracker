import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Footer from './Footer';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="main">
        <NavMenu />
        <div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
