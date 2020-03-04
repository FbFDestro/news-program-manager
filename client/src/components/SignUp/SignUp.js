import React, { Component } from 'react';
import Main from '../Main/Main';
import CheckboxList from '../CheckboxList/CheckboxList';
import Alert from '../Alert/Alert';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      cpf: '',
      phone: '',
      status: '',
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

    console.log(JSON.stringify(data));
    try {
      const response = await fetch('/api/pessoas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      console.log(response);

      if (response.status === 200) {
        this.setState({ status: 'success' });
      } else {
        this.setState({ status: 'error' });
      }
      // needs to get error message
    } catch (error) {
      this.setState({ status: 'error' });
    }

    //this.setState({ status: 'success' });
  };

  render() {
    let alertBox = '';
    const { status } = this.state;
    if (status.length > 0) {
      if (status === 'submiting') {
        alertBox = <Alert type='neutral'>Cadastrando usuarios...</Alert>;
      } else if (status === 'success') {
        alertBox = <Alert type='success'>Usuario cadastrado com sucesso!</Alert>;
      } else if (status === 'error') {
        alertBox = <Alert type='error'>Algo deu errado!</Alert>;
      }
    }

    return (
      <Main title='Cadastrar novo usuario'>
        <>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              name='name'
              placeholder='Nome *'
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input
              type='text'
              name='cpf'
              placeholder='CPF *'
              value={this.state.cpf}
              onChange={this.handleChange}
            />
            <input
              type='text'
              name='phone'
              placeholder='Telefone'
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <CheckboxList
              title='Cargos'
              checkboxStates={this.state.roles}
              handleChange={this.handleChange}
            />
            <input
              type='submit'
              value='Cadastrar'
              style={{
                float: 'right',
                marginTop: '-30px'
              }}
            />
          </form>
          <p>Itens com (*) são obrigatórios</p>
          {alertBox}
        </>
      </Main>
    );
  }
}
