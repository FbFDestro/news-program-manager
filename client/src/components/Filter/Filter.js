import React, { Component } from 'react';
import './Filter.css';
import Checkbox from '../Checkbox/Checkbox';

export default class Filter extends Component {
  render() {
    const listOfFilters = Object.keys(this.props.filter).map(prop => {
      return (
        <li key={prop}>
          <Checkbox
            name={prop.toString()}
            isChecked={this.props.filter[prop]}
            handleChange={this.props.handleChange}
          />
        </li>
      );
    });

    return (
      <ul id='filters'>
        <li>
          <h3>Filtros</h3>
        </li>
        {listOfFilters}
      </ul>
    );
  }
}
