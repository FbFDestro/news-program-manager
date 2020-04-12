import React, { Component } from 'react';
import Alert from '../../../Alert/Alert';
import Table from '../../../Table/Table';
import CheckboxList from '../../../CheckboxList/CheckboxList';

export default class AgendaTable extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      agendas: null,
      filter: {
        onlyMine: false,
        withoutArticle: false,
      },
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getAgendas();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    const { dataNewAgenda } = this.props;
    if (prevProps.dataNewAgenda !== dataNewAgenda && dataNewAgenda !== null) {
      this.addNewElementWithoutUpdate();
    }
  }

  addNewElementWithoutUpdate() {
    this.setState(
      (oldState) => {
        let newAgendas = oldState.agendas;
        newAgendas.unshift(this.props.dataNewAgenda);
        return { agendas: newAgendas, ...oldState };
      },
      () => {
        this.props.changeDataNewAgenda(null);
      }
    );
  }

  async getAgendas(filters = '') {
    let filter = '/api/pautas/' + filters;
    const response = await fetch(filter);
    const agendas = await response.json();

    if (this._isMounted) {
      this.setState({
        agendas,
      });
    }
  }

  handleFilterChange = (event) => {
    console.log(event.target.name);
    const name = event.target.name;
    this.setState((prevState) => {
      return {
        filter: {
          ...prevState.filter,
          [name]: !prevState.filter[name],
        },
      };
    }, this.updateFilters);
  };

  updateFilters() {
    const { onlyMine, withoutArticle } = this.state.filter;
    const { loggedUserCpf } = this.props;
    let filters = '';
    if (onlyMine && !withoutArticle) {
      filters = `pesquisador/${loggedUserCpf}`;
    } else if (!onlyMine && withoutArticle) {
      filters = 'semMateria';
    } else if (onlyMine && withoutArticle) {
      filters = `semMateria/${loggedUserCpf}`;
    }
    this.getAgendas(filters);
  }

  showAgendaDetails = (event) => {
    const { id } = event.currentTarget;
    this.props.changeSpecificAgenda(id, this.state.agendas[id].titulo);
    //this.setState({ specificAgenda: id });
  };

  createRow = (agenda, index) => {
    return (
      <tr key={agenda.titulo} onClick={this.showAgendaDetails} id={index}>
        <td>{agenda.titulo}</td>
        <td>{agenda.nome}</td>
        <td>{agenda.data_inclusao}</td>
        <td>{agenda.resumo}</td>
      </tr>
    );
  };

  deleteSpecificAgenda = async () => {
    if (this.props.specificAgenda === null) return;

    const title = this.state.agendas[this.props.specificAgenda].titulo;
    this.props.changeStateStatus('submiting', 'Pauta sendo deletada...');
    try {
      const response = await fetch('/api/pautas/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo: title }),
      });

      this.props.changeStateStatus('success', 'Pauta deletada com sucesso!');
      //
      this.setState(
        (prevState) => {
          const newAgendas = prevState.agendas.filter((agenda) => {
            return agenda.titulo !== title;
          });
          return { agendas: newAgendas };
        },
        () => {
          this.props.changeSpecificAgenda(null);
        }
      );

      this.props.updatePercentage();

      console.log(response);
    } catch (err) {
      this.props.changeStateStatus('error', 'Erro ao deletar pauta');
    }
  };

  render() {
    const { agendas } = this.state;
    const { specificAgenda } = this.props;
    const tableHeader = ['Titulo', 'Pesquisador', 'Data inclusão', 'Resumo'];

    let tableContent;
    if (specificAgenda !== null) {
      tableContent = this.createRow(agendas[specificAgenda], specificAgenda);
    } else {
      tableContent =
        agendas &&
        agendas.map((agenda, index) => {
          return this.createRow(agenda, index);
        });
    }

    let content;
    if (agendas == null) {
      content = <Alert type='neutral'>Carregando...</Alert>;
    } else if (agendas.length > 0) {
      content = <Table headerFields={tableHeader}>{tableContent}</Table>;
    } else {
      content = <Alert type='neutral'>Nenhuma pauta encontrada</Alert>;
    }

    const filterNames = {
      onlyMine: 'Minhas pautas',
      withoutArticle: 'Pautas sem matéria',
    };

    let specificAgendaContent;
    if (specificAgenda !== null) {
      specificAgendaContent = (
        <>
          <Table headerFields={['Links']}>{this.props.specificAgendaLinks}</Table>
          <button
            type='button'
            className='btn btn-blue btn-inline'
            onClick={() => {
              this.props.changeSpecificAgenda(null);
            }}
          >
            Ver todas as pautas
          </button>
          <button
            type='button'
            className='btn btn-red btn-inline right'
            onClick={this.deleteSpecificAgenda}
          >
            Apagar pauta
          </button>
        </>
      );
    }

    return (
      <div id='pautas'>
        {!specificAgenda ? (
          <CheckboxList
            title='Filtros'
            align='right'
            checkboxStates={this.state.filter}
            handleChange={this.handleFilterChange}
            filterNames={filterNames}
          />
        ) : null}

        {content}
        {specificAgenda ? specificAgendaContent : null}
      </div>
    );
  }
}
