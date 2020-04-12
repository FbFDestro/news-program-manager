import React, { Component } from 'react';
import Alert from '../../../Alert/Alert';
import Table from '../../../Table/Table';

export default class FinalArticleTable extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      finalArticles: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getFinalArticles();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getFinalArticles() {
    let url = '/api/materias_finais';
    const response = await fetch(url);
    const finalArticles = await response.json();

    if (this._isMounted) {
      this.setState({
        finalArticles,
      });
    }
  }

  showFinalArticleDetails = (event) => {
    const { id } = event.currentTarget;
    this.props.changeSpecificFinalArticle({ id, data: this.state.finalArticles[id] });
  };

  createRow = (finalArticle, index) => {
    return (
      <tr
        key={finalArticle.video_final}
        onClick={this.showFinalArticleDetails}
        id={index}
      >
        <td>{finalArticle.video_final}</td>
        <td>{finalArticle.nome}</td>
        <td>{finalArticle.episodio}</td>
      </tr>
    );
  };

  render() {
    const { finalArticles } = this.state;
    const { specificFinalArticle } = this.props;
    const tableHeader = ['Video final', 'Editor', 'Data do episódio'];

    let tableContent;
    if (specificFinalArticle !== null) {
      tableContent = this.createRow(specificFinalArticle.data, specificFinalArticle.id);
    } else {
      tableContent =
        finalArticles &&
        finalArticles.map((finalArticle, index) => {
          return this.createRow(finalArticle, index);
        });
    }

    let content;
    if (finalArticles == null) {
      content = <Alert type='neutral'>Carregando...</Alert>;
    } else if (finalArticles.length > 0) {
      content = <Table headerFields={tableHeader}>{tableContent}</Table>;
    } else {
      content = <Alert type='neutral'>Nenhuma matéria final encontrada</Alert>;
    }

    let specificFinalArticleContent;
    if (specificFinalArticle !== null) {
      const participantsList =
        specificFinalArticle.participants &&
        specificFinalArticle.participants.map((participant, id) => {
          return (
            <li key={'participant-' + id}>
              Participante {id + 1}: {participant}
            </li>
          );
        });

      console.log(specificFinalArticle);
      specificFinalArticleContent = (
        <>
          <p>{specificFinalArticle.data.texto}</p>

          <ul id='listaParticipantes'>
            <li key='pesquisador'>
              Pesquisador: {specificFinalArticle.workers.pesquisador}
            </li>
            <li key='jornalista'>
              Jornalista: {specificFinalArticle.workers.jornalista}
            </li>
            <li key='produtor'>Produtor: {specificFinalArticle.workers.produtor}</li>
            <li key='editor'>Editor: {specificFinalArticle.workers.editor}</li>
            {participantsList}
          </ul>

          <button
            type='button'
            className='btn btn-blue btn-inline'
            onClick={() => {
              this.props.changeSpecificFinalArticle(null);
            }}
          >
            Ver todas as materias finais
          </button>
        </>
      );
    }

    return (
      <div id='materias'>
        {content}
        {specificFinalArticle ? specificFinalArticleContent : null}
      </div>
    );
  }
}
