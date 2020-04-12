import React, { Component } from 'react';
import Alert from '../../../Alert/Alert';
import Table from '../../../Table/Table';
import CheckboxList from '../../../CheckboxList/CheckboxList';

export default class ArticleTable extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
      filter: {
        onlyMine: false,
      },
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getArticles();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    const { dataNewArticle } = this.props;
    if (prevProps.dataNewArticle !== dataNewArticle && dataNewArticle !== null) {
      this.addNewElementWithoutUpdate();
    }
  }

  addNewElementWithoutUpdate() {
    this.setState(
      (oldState) => {
        let newArticles = oldState.articles;
        newArticles.unshift(this.props.dataNewArticle);
        return { articles: newArticles, ...oldState };
      },
      () => {
        this.props.changeDataNewArticle(null);
      }
    );
  }

  async getArticles(filters = '') {
    let filter = '/api/materias/' + filters;
    const response = await fetch(filter);
    const articles = await response.json();

    if (this._isMounted) {
      this.setState({
        articles,
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
    const { onlyMine } = this.state.filter;
    const { loggedUserCpf } = this.props;
    let filters = '';
    if (onlyMine) {
      filters = `jornalista/${loggedUserCpf}`;
    }
    this.getArticles(filters);
  }

  showArticleDetails = (event) => {
    const { id } = event.currentTarget;
    this.props.changeSpecificArticle(id);
    //this.setState({ specificArticle: id });
  };

  createRow = (article, index) => {
    return (
      <tr key={article.titulo} onClick={this.showArticleDetails} id={index}>
        <td>{article.titulo}</td>
        <td>{article.nome}</td>
        <td>{article.data_inclusao}</td>
      </tr>
    );
  };

  render() {
    const { articles } = this.state;
    const { specificArticle } = this.props;
    const tableHeader = ['Titulo', 'Jornalista', 'Data inclusão'];

    let tableContent;
    if (specificArticle !== null) {
      tableContent = this.createRow(articles[specificArticle], specificArticle);
    } else {
      tableContent =
        articles &&
        articles.map((article, index) => {
          return this.createRow(article, index);
        });
    }

    let content;
    if (articles == null) {
      content = <Alert type='neutral'>Carregando...</Alert>;
    } else if (articles.length > 0) {
      content = <Table headerFields={tableHeader}>{tableContent}</Table>;
    } else {
      content = <Alert type='neutral'>Nenhuma matéria encontrada</Alert>;
    }

    const filterNames = {
      onlyMine: 'Minhas materias',
    };

    let specificArticleContent;
    if (specificArticle !== null) {
      specificArticleContent = (
        <>
          <p>{articles[specificArticle].texto}</p>
          <button
            type='button'
            className='btn btn-blue btn-inline'
            onClick={() => {
              this.props.changeSpecificArticle(null);
            }}
          >
            Ver todas as materias
          </button>
        </>
      );
    }

    return (
      <div id='materias'>
        {!specificArticle ? (
          <CheckboxList
            title='Filtros'
            align='right'
            checkboxStates={this.state.filter}
            handleChange={this.handleFilterChange}
            filterNames={filterNames}
          />
        ) : null}

        {content}
        {specificArticle ? specificArticleContent : null}
      </div>
    );
  }
}
