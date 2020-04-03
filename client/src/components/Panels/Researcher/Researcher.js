import React, { Component } from 'react';

import '../Panels.css';
import NewAgenda from './NewAgenda/NewAgenda';

export default class Researcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewAgenda: false
    };
  }

  toggleAddNewBtnHandle = () => {
    this.setState(oldState => {
      return { showNewAgenda: !oldState.showNewAgenda };
    });
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
          />
        ) : null}
      </div>
    );
  }
}
