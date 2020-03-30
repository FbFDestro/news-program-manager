import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';

export default class UserPanel extends Component {
  render() {
    const { url } = this.props.match;

    return (
      <Main title='Paineis de usuarios'>
        <>
          <h1>
            {this.props.authManage.userData ? this.props.authManage.userData.cpf : ''}
          </h1>
          <Link
            className='btn btn-blue btn-inline btn-big'
            id='pesquisador'
            to={`${url}/pesquisador`}
          >
            Painel de Pesquisador
          </Link>
          <a
            className='btn btn-blue btn-inline btn-big'
            id='jornalista'
            href='jornalista.html'
          >
            Painel de Jornalista
          </a>
          <a
            className='btn btn-blue btn-inline btn-big'
            id='produtor'
            href='produtor.html'
          >
            Painel de Produtor
          </a>
          <a className='btn btn-blue btn-inline btn-big' id='editor' href='editor.html'>
            Painel de Editor
          </a>
        </>

        <Switch>
          <Route path={`${url}/pesquisador`}>
            <h1>Pesquisadoooor</h1>
          </Route>
        </Switch>
      </Main>
    );
  }
}
