import React, { Component } from 'react';
import CheckboxList from '../../CheckboxList/CheckboxList';
import Table from '../../Table/Table';
import Alert from '../../Alert/Alert';

export default class UsersLoginTable extends Component {
  _isMounted = false;
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
    this._isMounted = true;
    this.getUsers();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getUsers(filters = '') {
    let strReq = '/api/pessoas/' + filters;
    const response = await fetch(strReq);
    const users = await response.json();

    if (this._isMounted) {
      this.setState({
        users
      });
    }
  }

  handleFilterChange = event => {
    console.log(event.target.name);
    const name = event.target.name;
    this.setState(prevState => {
      return {
        filter: {
          ...prevState.filter,
          [name]: !prevState.filter[name]
        }
      };
    }, this.updateFilters);
  };

  updateFilters() {
    let filters = '';
    for (const filter in this.state.filter) {
      if (this.state.filter[filter]) {
        if (filters.length > 0) {
          filters += '&';
        }
        filters += filter.toString() + '=1';
      }
    }

    if (filters.length > 0) {
      this.getUsers('filtros?' + filters);
    } else {
      this.getUsers();
    }
  }

  login = event => {
    const userData = this.state.users[event.currentTarget.id];
    console.log(userData);
    this.props.login(userData);
  };

  render() {
    const tableHeader = ['Nome', 'CPF', 'Telefone', 'Cargos'];
    const tableContent =
      this.state.users &&
      this.state.users.map((user, index) => {
        let roles = '';
        if (user.pesquisador) roles += 'Pesquisador; ';
        if (user.jornalista) roles += 'Jornalista; ';
        if (user.produtor) roles += 'Produtor; ';
        if (user.editor) roles += 'Editor; ';

        return (
          <tr key={user.cpf} onClick={this.login} id={index}>
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
        <CheckboxList
          title='Filtros'
          align='right'
          checkboxStates={this.state.filter}
          handleChange={this.handleFilterChange}
        />
        {content}
      </div>
    );
  }
}
