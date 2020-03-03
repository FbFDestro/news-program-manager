import React, { Component } from 'react';

export default class Checkbox extends Component {
  render() {
    return (
      <>
        <input
          type='checkbox'
          name={this.props.name}
          checked={this.props.isChecked}
          onChange={this.props.handleChange}
        />{' '}
        {this.props.name}
      </>
    );
  }
}
