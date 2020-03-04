import React, { Component } from 'react';
import './CheckboxList.css';
import Checkbox from '../Checkbox/Checkbox';

export default class CheckboxList extends Component {
  render() {
    const listOfCheckbox = Object.keys(this.props.checkboxStates).map(prop => {
      return (
        <li key={prop}>
          <Checkbox
            name={prop.toString()}
            isChecked={this.props.checkboxStates[prop]}
            handleChange={this.props.handleChange}
          />
        </li>
      );
    });

    return (
      <ul className={'checkboxList checkboxList-' + (this.props.align || 'left')}>
        <li>
          <h3>{this.props.title}</h3>
        </li>
        {listOfCheckbox}
      </ul>
    );
  }
}
