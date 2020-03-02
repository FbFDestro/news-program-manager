import React, { Component } from 'react';
import Filter from '../../Filter/Filter';
import Table from '../../Table/Table';
import Alert from '../../Alert/Alert';

export default class UsersLoginTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      filter: {
        pesquisador: false,
        jornalista: false,
        produtor: false,
        editor: false
      }
    };
    // bind handleFilter
  }

  async componentDidMount() {
    const users = await this.getUsers();
    this.setState({ users });
    // Am I removing filter from the state? need to check this:wq
  }

  async getUsers() {
    let strReq = '/api/pessoas/';
    //strReq = 'api/pessoas/filtros?pesquisador=1&jornalista=1&produtor=1';
    const response = await fetch(strReq);
    return await response.json();
  }

  handleFilterChange = async event => {
    console.log(event.target.value);
    this.setState(prevState => {});
    // need to update state
  };

  render() {
    const tableHeader = ['Nome', 'CPF', 'Telefone', 'Cargos'];
    const tableContent =
      this.state.users &&
      this.state.users.map(user => {
        let roles = '';
        if (user.pesquisador != null) {
          roles += 'Pesquisador; ';
        }
        if (user.jornalista != null) {
          roles += 'Jornalista; ';
        }
        if (user.produtor != null) {
          roles += 'Produtor; ';
        }
        if (user.editor != null) {
          roles += 'Editor; ';
        }

        return (
          <tr key={user.cpf}>
            <td>{user.nome}</td>
            <td>{user.cpf}</td>
            <td>{user.tel}</td>
            <td>{roles}</td>
          </tr>
        );
      });

    let content;
    if (this.state.users == null) {
      content = <Alert type='neutral'>Carregando...</Alert>;
    } else if (this.state.users.length > 0) {
      content = <Table headerFields={tableHeader}>{tableContent}</Table>;
    } else {
      content = <Alert type='neutral'>Nenhum usuario encontrado</Alert>;
    }

    return (
      <div id='usuarios'>
        <Filter filter={this.state.filter} handleChange={this.handleFilterChange} />
        {content}
      </div>
    );
  }
}
