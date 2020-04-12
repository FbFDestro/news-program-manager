import React, { Component } from 'react';
import Alert from '../../../Alert/Alert';

export default class NewAgenda extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      sumary: '',
      links: [''],
      status: '',
      responseText: '',
    };
  }

  addNewLink = () => {
    const { links } = this.state;
    links.push('');
    this.setState({ links });
  };

  clear = () => {
    this.setState({ title: '', sumary: '', links: [''] });
  };

  handleChange = (event) => {
    const { name, id, value } = event.target;

    if (name === 'link') {
      const { links } = this.state;
      links[id] = value;
      this.setState({ links });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = async () => {
    const data = {
      titulo: this.state.title,
      pesquisador: this.props.authManage.userData.cpf,
      resumo: this.state.sumary,
    };

    this.setState({ responseText: 'Cadastrando nova pauta...', status: 'submiting' });
    try {
      const response = await fetch('/api/pautas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status !== 200) {
        throw new Error('Erro ao inserir pauta. ' + response.statusText);
      }

      for (const link of this.state.links) {
        if (link.length > 0) {
          await fetch('/api/pautas/link', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pauta: this.state.title, link }),
          });
        }
      }

      const today = new Date();
      let dd = today.getDate();
      if (dd < 10) dd = '0' + dd;
      let mm = today.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;
      const yyyy = today.getFullYear();

      this.props.changeDataNewAgenda({
        titulo: data.titulo,
        nome: this.props.authManage.userData.nome,
        resumo: data.resumo,
        data_inclusao: dd + '/' + mm + '/' + yyyy,
      });

      this.clear();
      this.setState({ status: 'success', responseText: 'Pauta cadastrada com sucesso' });
    } catch (error) {
      console.log(error.message);
      this.clear();
      this.setState({ status: 'error', responseText: error.message });
    }
  };

  render() {
    const links = this.state.links.map((val, id) => {
      return (
        <input
          key={id}
          id={id}
          type='text'
          name='link'
          placeholder='Link'
          value={val}
          onChange={this.handleChange}
        />
      );
    });

    let alertBox = '';
    const { status, responseText } = this.state;
    if (status.length > 0) {
      alertBox = (
        <Alert type={status !== 'submiting' ? status : 'neutral'}>{responseText}</Alert>
      );
    }

    return (
      <div id='cadastrarPauta'>
        <h1>Cadastrar nova pauta</h1>

        <form>
          <input
            type='text'
            name='title'
            value={this.state.title}
            placeholder='Título *'
            onChange={this.handleChange}
          />

          <input
            type='text'
            name='sumary'
            value={this.state.sumary}
            placeholder='Resumo'
            onChange={this.handleChange}
          />

          <div id='listaLinks'>{links}</div>

          <input
            type='button'
            className='btn btn-inline btn-blue'
            value='Cadastrar'
            onClick={this.handleSubmit}
          />

          <input
            type='button'
            className='btn btn-inline btn-blue'
            value='Adicionar Link'
            onClick={this.addNewLink}
          />
          <input
            type='button'
            className='btn btn-inline btn-blue right'
            value='Fechar'
            onClick={this.props.close}
          />
          <input
            type='button'
            className='btn btn-inline btn-blue right'
            value='Limpar'
            onClick={this.clear}
          />
        </form>

        <p>Itens com (*) são obrigatórios</p>

        {alertBox}
      </div>
    );
  }
}
