import React, { Component } from 'react';
import './Menu.css';

export default class Menu extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <a href='index.html' className={'active'}>
              Entrar
            </a>
          </li>
          <li>
            <a href='pessoas/cadastrar.html'>Cadastrar</a>
          </li>
        </ul>
      </nav>
    );
  }
}
