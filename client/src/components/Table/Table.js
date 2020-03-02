import React, { Component } from 'react';
import './Table.css';

export default class Table extends Component {
  render() {
    let headerFields = this.props.headerFields.map((name, index) => {
      return <th key={index}>{name}</th>;
    });
    return (
      <table>
        <thead>
          <tr>{headerFields}</tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}
