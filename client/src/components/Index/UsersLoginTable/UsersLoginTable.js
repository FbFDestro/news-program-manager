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
  }

  componentDidMount() {
    this.getUsers();
  }

  async getUsers(filters = '') {
    let strReq = '/api/pessoas/' + filters;
    const response = await fetch(strReq);
    const users = await response.json();

    this.setState({
      users
    });
  }

  handleFilterChange = async event => {
    console.log(event.target.name);
    const name = event.target.name;
    await this.setState(prevState => {
      return {
        filter: {
          ...prevState.filter,
          [name]: !prevState.filter[name]
        }
      };
    });
    this.updateFilters();
  };

  updateFilters() {
    let filters = '';
    Object.keys(this.state.filter).forEach(filter => {
      if (this.state.filter[filter]) {
        if (filters.length > 0) {
          filters += '&';
        }
        filters += filter.toString() + '=1';
      }
    });

    if (filters.length > 0) {
      this.getUsers('filtros?' + filters);
    } else {
      this.getUsers();
    }
  }

  render() {
    const tableHeader = ['Nome', 'CPF', 'Telefone', 'Cargos'];
    const tableContent =
      this.state.users &&
      this.state.users.map(user => {
        let roles = '';
        if (user.pesquisador != null) roles += 'Pesquisador; ';
        if (user.jornalista != null) roles += 'Jornalista; ';
        if (user.produtor != null) roles += 'Produtor; ';
        if (user.editor != null) roles += 'Editor; ';

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
