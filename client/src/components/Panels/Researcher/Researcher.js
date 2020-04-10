import React, { Component } from 'react';

import '../Panels.css';
import NewAgenda from './NewAgenda/NewAgenda';
import AgendaTable from './AgendaTable/AgendaTable';

export default class Researcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewAgenda: false,
      specificAgenda: null,
      specificAgendaLinks: null,
      dataNewAgenda: null, // used to avoid having to reload data after new agenda
    };
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

  render() {
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
        />
      </div>
    );
  }
}
