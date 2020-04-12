import React, { Component } from 'react';

import '../Panels.css';
import NewArticle from './NewArticle/NewArticle';
import ArticleTable from './ArticleTable/ArticleTable';

export default class Journalist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewArticle: false,
      specificArticle: null,
      dataNewArticle: null, // used to avoid having to reload data after newArticlea
    };
  }

  changeSpecificArticle = (value) => {
    this.setState({ specificArticle: value });
  };

  toggleAddNewBtnHandle = () => {
    this.setState((oldState) => {
      return { showNewArticle: !oldState.showNewArticle, specificArticle: null };
    });
  };

  changeDataNewArticle = (newArticle) => {
    this.setState({ dataNewArticle: newArticle });
  };

  render() {
    return (
      <div className='panel'>
        <h1>Painel de jornalista</h1>
        <button
          type='button'
          id='btnNovaMateria'
          className='btn'
          onClick={this.toggleAddNewBtnHandle}
        >
          Cadastrar nova materia
        </button>
        {this.state.showNewArticle ? (
          <NewArticle
            authManage={this.props.authManage}
            close={this.toggleAddNewBtnHandle}
            changeDataNewArticle={this.changeDataNewArticle}
          />
        ) : null}
        <ArticleTable
          loggedUserCpf={this.props.authManage.userData.cpf}
          specificArticle={this.state.specificArticle}
          changeSpecificArticle={this.changeSpecificArticle}
          changeDataNewArticle={this.changeDataNewArticle}
          dataNewArticle={this.state.dataNewArticle}
        />
      </div>
    );
  }
}
