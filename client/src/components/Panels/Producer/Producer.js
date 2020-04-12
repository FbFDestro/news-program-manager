import React, { Component } from 'react';
import BoxStatistics from '../../BoxStatistics/BoxStatistics';
import ContainerStatistics from '../../ContainerStatistics/ContainerStatistics';

export default class Producer extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      equipaments: [],
      scenarios: [],
    };
  }

  async componentDidMount() {
    this._isMounted = true;

    const equipamentsResponse = await fetch(
      '/api/equipamentos/quantidadeUtilizada/total'
    );
    const equipaments = await equipamentsResponse.json();

    const scenariosResponse = await fetch('/api/locais/cenarios_mais_utilizados');
    const scenarios = await scenariosResponse.json();

    if (this._isMounted) {
      this.setState({ equipaments, scenarios });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const equipamentsList = this.state.equipaments.map((equipament) => {
      return (
        <BoxStatistics
          key={equipament.tipo}
          title={equipament.tipo}
          data={equipament.count + 'x'}
        />
      );
    });

    const scenariosList = this.state.scenarios.map((scenario) => {
      const title = `${scenario.andar}-${scenario.bloco}-${scenario.numero_sala}`;
      return (
        <BoxStatistics key={title} title={title} data={scenario.qtdlocacoes + 'x'} />
      );
    });

    return (
      <div className='panel'>
        <h1>Painel de jornalista</h1>

        <ContainerStatistics title='Quantidade de utilizações de equipamentos'>
          {equipamentsList}
        </ContainerStatistics>

        <ContainerStatistics title='Cenários ordenados por utilização (Bloco-Andar-Sala)'>
          {scenariosList}
        </ContainerStatistics>
      </div>
    );
  }
}
