import React, { Component } from 'react';
import './Filter.css';

export default class Filter extends Component {
  handleClick = event => {
    console.log(event.target.value);
    event.preventDefault();
  };

  render() {
    const listOfFilters = Object.keys(this.props.filter).map(prop => {
      return (
        <li key={prop}>
          <input
            type='checkbox'
            name={prop}
            value={prop}
            ckecked={this.props.filter[prop].toString()}
            onClick={this.props.handleChange}
          />{' '}
          {prop.toString()}
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
