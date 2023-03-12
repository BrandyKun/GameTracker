import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Footer from './Footer';
import NavBarMenu from './NavBarMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="main">
        <NavBarMenu/>
        <div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
