import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Menu from '../Menu/Menu';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div id='cabecalho'>
          <div id='logo'>
            <Link to='/'>Gerenciador de Jornal</Link>
          </div>
          <Menu />
        </div>
      </header>
    );
  }
}
