import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

export default class Menu extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to='/' className='btn active'>
              Entrar
            </Link>
          </li>
          <li>
            <Link to='/cadastro' className='btn'>
              Cadastrar
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
