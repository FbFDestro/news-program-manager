import React, { Component } from 'react';
import './Alert.css';

export default class Alert extends Component {
  render() {
    return <div className={'alert alert-' + this.props.type}>{this.props.children}</div>;
  }
}
