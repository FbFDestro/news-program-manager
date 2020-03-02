import React, { Component } from 'react';
import './Header.css';
import Menu from '../Menu/Menu';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div id='cabecalho'>
          <div id='logo'>
            <a href='index.html'>Gerenciador de Jornal</a>
          </div>
          <Menu />
        </div>
      </header>
    );
  }
}
