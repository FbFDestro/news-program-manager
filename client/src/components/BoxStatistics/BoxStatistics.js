import React, { Component } from 'react';
import './BoxStatistics.css';

export default class BoxStatistics extends Component {
  render() {
    return (
      <div className='boxStatistics'>
        <h3>{this.props.title}</h3>
        <span>{this.props.data}</span>
      </div>
    );
  }
}
