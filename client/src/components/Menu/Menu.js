import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

export default class Menu extends Component {
  render() {
    const { isLoadingUserData, isLogged, userData, logoutUser } = this.props.authManage;

    let menuItens;

    if (!isLoadingUserData && isLogged) {
      menuItens = (
        <>
          <li>
            <span className='loggedAs'>Logado como: {userData.nome}</span>
          </li>
          <li>
            <Link to='/' className='btn'>
              Meu Perfil
            </Link>
          </li>
          <li>
            <Link to='/' onClick={logoutUser} className='btn'>
              Sair
            </Link>
          </li>
        </>
      );
    } else {
      menuItens = (
        <>
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
        </>
      );
    }

    return (
      <nav>
        <ul>{menuItens}</ul>
      </nav>
    );
  }
}
