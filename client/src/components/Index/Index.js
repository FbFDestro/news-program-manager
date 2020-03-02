import React, { Component } from 'react';
import UsersLoginTable from './UsersLoginTable/UsersLoginTable';

export default class Index extends Component {
  render() {
    return (
      <>
        {/*
        <div id='usuarios'>
          <div id='box-cargos'>
            <ul id='cargos'>
              <li>
                <h3>Filtros</h3>
              </li>
              <li>
                <input type='checkbox' name='pesquisador' value='pesquisador' />{' '}
                Pesquisador
              </li>
              <li>
                <input type='checkbox' name='jornalista' value='jornalista' /> Jornalista
              </li>
              <li>
                <input type='checkbox' name='produtor' value='produtor' /> Produtor
              </li>
              <li>
                <input type='checkbox' name='editor' value='editor' /> Editor
              </li>
            </ul>
          </div>
          <table>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Cargos</th>
            </tr>
          </table>
          <p id='nenhumUsuario'>Nenhum usuario encontrado</p>
        </div>
      */}

        <UsersLoginTable />

        <div id='infoQuantidades' className='boxUnidades'>
          <h1>Quantidade de pessoas em cada cargo</h1>
        </div>

        <div id='cadastrarNovoBtn'>
          <a className='btn' href='pessoas/cadastrar.html'>
            Cadastrar novo
          </a>
        </div>
      </>
    );
  }
}
