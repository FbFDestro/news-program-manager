import React, { Component } from 'react';
import UsersLoginTable from './UsersLoginTable/UsersLoginTable';

export default class Index extends Component {
  render() {
    return (
      <>
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
