import React, { Component } from 'react';
import './Main.css';

export default class Main extends Component {
  render() {
    return (
      <main>
        <h1>{this.props.title}</h1>
        {this.props.children}
      </main>
    );
  }
}
