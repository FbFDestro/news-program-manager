import React, { Component } from 'react';

import '../Panels.css';
import NewAgenda from './NewAgenda/NewAgenda';
import AgendaTable from './AgendaTable/AgendaTable';
import Alert from '../../Alert/Alert';
import ContainerStatistics from '../../ContainerStatistics/ContainerStatistics';
import BoxStatistics from '../../BoxStatistics/BoxStatistics';

export default class Researcher extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      showNewAgenda: false,
      specificAgenda: null,
      specificAgendaLinks: null,
      changeStatus: null,
      changeText: null,
      dataNewAgenda: null, // used to avoid having to reload data after new agenda
      percentage: null,
    };
  }

  async componentDidMount() {
    this._isMounted = true;

    const response = await fetch('/api/pautas/porcentagemPautasGravadas');
    if (this._isMounted) {
      const percentage = await response.json();
      this.setState({ percentage });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  changeSpecificAgenda = async (value, title = null) => {
    if (value === null) {
      this.setState({ specificAgenda: value, specificAgendaLinks: null });
    } else {
      const response = await fetch(`/api/pautas/link/${title}`);
      const responseData = await response.json();

      let linkContent = responseData.map((row, id) => {
        return (
          <tr key={id}>
            <td>{row.link}</td>
          </tr>
        );
      });

      this.setState({ specificAgenda: value, specificAgendaLinks: linkContent });
    }
  };

  toggleAddNewBtnHandle = () => {
    this.setState((oldState) => {
      return { showNewAgenda: !oldState.showNewAgenda, specificAgenda: null };
    });
  };

  changeDataNewAgenda = (newAgenda) => {
    this.setState({ dataNewAgenda: newAgenda });
  };

  changeStateStatus = (status, text) => {
    this.setState({ changeStatus: status, changeText: text });
  };

  render() {
    const { changeStatus, changeText } = this.state;

    let alert = null;
    if (changeStatus !== null) {
      alert = <Alert type={changeStatus}>{changeText}</Alert>;
    }

    return (
      <div className='panel'>
        <h1>Paineis de pesquisador</h1>

        <button
          type='button'
          id='btnNovaPauta'
          className='btn'
          onClick={this.toggleAddNewBtnHandle}
        >
          Cadastrar nova pauta
        </button>

        {alert}

        {this.state.showNewAgenda ? (
          <NewAgenda
            authManage={this.props.authManage}
            close={this.toggleAddNewBtnHandle}
            changeDataNewAgenda={this.changeDataNewAgenda}
          />
        ) : null}

        <AgendaTable
          loggedUserCpf={this.props.authManage.userData.cpf}
          specificAgenda={this.state.specificAgenda}
          specificAgendaLinks={this.state.specificAgendaLinks}
          changeSpecificAgenda={this.changeSpecificAgenda}
          changeDataNewAgenda={this.changeDataNewAgenda}
          dataNewAgenda={this.state.dataNewAgenda}
          changeStateStatus={this.changeStateStatus}
        />

        <ContainerStatistics title='Porcentagem de pautas catalogadas que viraram gravação'>
          <BoxStatistics
            title='Porcentagem'
            data={this.state.percentage ? this.state.percentage + '%' : '...'}
          />
        </ContainerStatistics>
      </div>
    );
  }
}
