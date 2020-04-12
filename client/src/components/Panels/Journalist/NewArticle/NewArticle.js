import React, { Component } from 'react';
import Alert from '../../../Alert/Alert';

export default class NewArticle extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      options: null,
      optionValue: null,
      text: '',
      status: '',
      responseText: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getOptions();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getOptions() {
    const response = await fetch('/api/pautas/semMateria');
    const agendasWithoutArticle = await response.json();
    let options;
    if (agendasWithoutArticle)
      options = agendasWithoutArticle.map((agenda) => agenda.titulo);

    if (this._isMounted) {
      this.setState({
        options,
        optionValue: options.length > 0 ? options[0] : null,
      });
    }
  }

  clear = () => {
    this.setState((oldState) => {
      return {
        optionValue: oldState.options.length > 0 ? oldState.options[0] : null,
        text: '',
      };
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    const data = {
      titulo: this.state.optionValue,
      jornalista: this.props.authManage.userData.cpf,
      texto: this.state.text,
    };

    this.setState({ responseText: 'Cadastrando nova materia...', status: 'submiting' });
    try {
      const response = await fetch('/api/materias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status !== 200) {
        throw new Error('Erro ao inserir pauta. ' + response.statusText);
      }

      const today = new Date();
      let dd = today.getDate();
      if (dd < 10) dd = '0' + dd;
      let mm = today.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;
      const yyyy = today.getFullYear();

      this.props.changeDataNewArticle({
        titulo: data.titulo,
        nome: this.props.authManage.userData.nome,
        data_inclusao: dd + '/' + mm + '/' + yyyy,
        texto: data.texto,
      });

      this.setState((oldState) => {
        const newOptions = oldState.options.filter((op) => op !== data.titulo);
        return {
          options: newOptions,
        };
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
    let alertBox = '';
    const { status, responseText } = this.state;
    if (status.length > 0) {
      alertBox = (
        <Alert type={status !== 'submiting' ? status : 'neutral'}>{responseText}</Alert>
      );
    }

    let selectOptions = null;
    if (this.state.options) {
      selectOptions = this.state.options.map((op) => {
        return (
          <option key={op} value={op}>
            {op}
          </option>
        );
      });
    }

    return (
      <div id='cadastrarMateria'>
        <h1>Cadastrar nova materia</h1>

        <form>
          <p>Selecione uma pauta sem matéria</p>

          <select
            style={{ width: '100%', height: '50px' }}
            value={this.state.option}
            name='optionValue'
            onChange={this.handleChange}
          >
            {selectOptions}
          </select>

          <textarea
            name='text'
            placeholder='Texto'
            value={this.state.text}
            onChange={this.handleChange}
            style={{ resize: 'vertical', minHeight: '80px' }}
          />

          <input
            type='button'
            className='btn btn-inline btn-blue'
            value='Cadastrar'
            onClick={this.handleSubmit}
          />

          <input
            type='button'
            className='btn btn-inline btn-blue right'
            value='Fechar'
            onClick={this.props.close}
          />
        </form>

        <p>Itens com (*) são obrigatórios</p>

        {alertBox}
      </div>
    );
  }
}
