import React, { Component, Fragment } from 'react';
import Main from '../Main/Main';
//import CheckboxList from '../CheckboxList/CheckboxList';
import Alert from '../Alert/Alert';

import { Link } from 'react-router-dom';
import ProfileForm from '../ProfileForm/ProfileForm';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      cpf: '',
      phone: '',
      status: '',
      responseText: '',
      roles: {
        pesquisador: false,
        jornalista: false,
        produtor: false,
        editor: false
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
    //await new Promise(r => setTimeout(r, 1000));

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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseText = await response.text();
    if (response.status === 200) {
      this.setState({ status: 'success', responseText: responseText });
    } else {
      this.setState({ status: 'error', responseText: responseText });
    }
  };

  render() {
    let alertBox = '';
    const { status } = this.state;
    if (status.length > 0) {
      if (status === 'submiting') {
        alertBox = <Alert type='neutral'>Cadastrando usuarios...</Alert>;
      } else {
        alertBox = (
          <Alert type={status}>
            {this.state.responseText}
            {status === 'success'
              ? [
                  <Fragment key='1'> - </Fragment>,
                  <Link key='2' to='/'>
                    {' '}
                    Voltar para a página de Login
                  </Link>
                ]
              : ''}
          </Alert>
        );
      }
    }

    return (
      <Main title='Cadastrar novo usuario'>
        <>
          <ProfileForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            name={this.state.name}
            cpf={this.state.cpf}
            disableCpf={false}
            phone={this.state.phone}
            roles={this.state.roles}
            buttonText='Cadastrar'
          />

          {alertBox}
        </>
      </Main>
    );
  }
}
