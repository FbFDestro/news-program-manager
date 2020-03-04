import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UsersLoginTable from './UsersLoginTable/UsersLoginTable';
import ContainerStatistics from '../ContainerStatistics/ContainerStatistics';
import BoxStatistics from '../BoxStatistics/BoxStatistics';
import Main from '../Main/Main';

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counterRoles: {
        pesquisador: null,
        jornalista: null,
        produtor: null,
        editor: null
      }
    };
  }

  async componentDidMount() {
    const counterRoles = { ...this.state.counterRoles };
    for (const role in counterRoles) {
      const strReq = `/api/pessoas/quantidade/${role.toString()}`;
      const response = await fetch(strReq);
      const count = await response.json();
      counterRoles[role] = count;
    }

    this.setState({ counterRoles });
  }

  render() {
    const boxStatistics = Object.keys(this.state.counterRoles).map(role => {
      return (
        <BoxStatistics
          key={role}
          title={role}
          data={this.state.counterRoles[role] || '...'}
        />
      );
    });

    return (
      <Main title='Faça login para utilizar o sistema como um dos usuarios'>
        <>
          <UsersLoginTable />

          <ContainerStatistics title='Quantidade de pessoas em cada cargo'>
            {boxStatistics}
          </ContainerStatistics>

          <div className='centeredBox'>
            <Link to='/cadastro' className='btn btn-blue btn-big btn-inline'>
              Cadastrar novo
            </Link>
          </div>
        </>
      </Main>
    );
  }
}
