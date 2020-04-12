import React, { Component, Fragment } from 'react';
import Main from '../Main/Main';
import ProfileForm from '../ProfileForm/ProfileForm';
import Alert from '../Alert/Alert';
import { Link } from 'react-router-dom';

export default class MyProfile extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.authManage);
    const {
      nome,
      cpf,
      tel,
      pesquisador,
      jornalista,
      produtor,
      editor
    } = this.props.authManage.userData;

    this.state = {
      name: nome,
      cpf,
      phone: tel,
      status: '',
      responseText: '',
      roles: {
        pesquisador,
        jornalista,
        produtor,
        editor
      }
    };
  }

  handleChange = event => {
    const name = event.target.name;
    if (event.target.type === 'checkbox') {
      this.setState(prevState => {
        return {
          roles: {
            ...prevState.roles,
            [name]: !prevState.roles[name]
          }
        };
      });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ status: 'submiting' });

    let data = {
      nome: this.state.name,
      cpf: this.state.cpf,
      telefone: this.state.phone,
      pesquisador: this.state.roles.pesquisador,
      jornalista: this.state.roles.jornalista,
      produtor: this.state.roles.produtor,
      editor: this.state.roles.editor
    };

    const response = await fetch('/api/pessoas', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseText = await response.text();
    if (response.status === 200) {
      this.setState({ status: 'success', responseText: responseText });
      this.props.authManage.loginUser({ tel: data.telefone, ...data });
    } else {
      this.setState({ status: 'error', responseText: responseText });
    }
  };

  render() {
    let alertBox = '';
    const { status } = this.state;
    if (status.length > 0) {
      if (status === 'submiting') {
        alertBox = <Alert type='neutral'>Atualizando dados...</Alert>;
      } else {
        alertBox = (
          <Alert type={status}>
            {this.state.responseText}
            {status === 'success'
              ? [
                  <Fragment key='1'> - </Fragment>,
                  <Link key='2' to='/paineis'>
                    {' '}
                    Voltar para os meus paineis
                  </Link>
                ]
              : ''}
          </Alert>
        );
      }
    }

    return (
      <Main title='Meu Perfil - Atualizar registro'>
        <>
          <ProfileForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            name={this.state.name}
            cpf={this.state.cpf}
            disableCpf={true}
            phone={this.state.phone}
            roles={this.state.roles}
            buttonText='Atualizar'
          />

          {alertBox}
        </>
      </Main>
    );
  }
}
