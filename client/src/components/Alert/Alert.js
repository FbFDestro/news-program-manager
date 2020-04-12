import React, { Component } from 'react';
import './Alert.css';

export default class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    if (!this.state.visible) return null;

    return (
      <div
        className={`alert alert-${this.props.type} ${
          this.props.flex ? 'alert-flex' : ''
        } `}
      >
        {this.props.children}
        <span className='right spanLink' onClick={this.hide}>
          Fechar
        </span>
      </div>
    );
  }
}
