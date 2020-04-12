import React, { Component } from 'react';

import '../Panels.css';
import FinalArticleTable from './FinalArticleTable/FinalArticleTable';

export default class Editor extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      specificFinalArticle: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  changeSpecificFinalArticle = async (value) => {
    if (value === null) {
      this.setState({ specificFinalArticle: value });
    } else {
      console.log(value);
      let url = `/api/materias_finais/creditos/${value.data.video_final}`;
      const response = await fetch(url);
      const creditsDetails = await response.json();

      let participants = creditsDetails.map((credit) => {
        return credit.participante;
      });
      if (participants.length > 0 && participants[0] === null) participants = null;

      let workers = null;
      if (creditsDetails.length > 0) {
        workers = {
          pesquisador: creditsDetails[0].pesquisador,
          jornalista: creditsDetails[0].jornalista,
          produtor: creditsDetails[0].produtor,
          editor: creditsDetails[0].editor,
        };
      }

      const credits = {
        ...value,
        workers,
        participants,
      };

      if (this._isMounted) {
        this.setState({ specificFinalArticle: credits });
      }
    }
  };

  render() {
    return (
      <div className='panel'>
        <h1>Painel de editor</h1>
        <FinalArticleTable
          loggedUserCpf={this.props.authManage.userData.cpf}
          specificFinalArticle={this.state.specificFinalArticle}
          changeSpecificFinalArticle={this.changeSpecificFinalArticle}
        />
      </div>
    );
  }
}
