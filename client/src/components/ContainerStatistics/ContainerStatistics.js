import React, { Component } from 'react';
import './ContainerStatistics.css';

export default class ContainerStatistics extends Component {
  render() {
    return (
      <div className='containerStatistics'>
        <h1>{this.props.title}</h1>
        {this.props.children}
      </div>
    );
  }
}
