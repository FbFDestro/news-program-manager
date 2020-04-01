import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

export default class Menu extends Component {
  isActive(linkPath, url) {
    if (linkPath == url) return 'btn active';
    return 'btn';
  }

  render() {
    const { isLogged, userData, logoutUser } = this.props.authManage;
    let menuItens;

    const { url } = this.props.match;

    if (isLogged) {
      menuItens = (
        <>
          <li>
            <span className='loggedAs'>Logado como: {userData.nome}</span>
          </li>
          <li>
            <Link to='/paineis' className={this.isActive('/paineis', url)}>
              Meus Paineis
            </Link>
          </li>
          <li>
            <Link to='/meuPerfil' className={this.isActive('/meuPerfil', url)}>
              Meu Perfil
            </Link>
          </li>
          <li>
            <Link to='/' onClick={logoutUser} className={this.isActive('/', url)}>
              Sair
            </Link>
          </li>
        </>
      );
    } else {
      menuItens = (
        <>
          <li>
            <Link to='/' className={this.isActive('/', url)}>
              Entrar
            </Link>
          </li>
          <li>
            <Link to='/cadastro' className={this.isActive('/cadastro', url)}>
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
