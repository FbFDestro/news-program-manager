import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Researcher from '../Panels/Researcher/Researcher';

export default class UserPanel extends Component {
  render() {
    const { url } = this.props.match;
    const { pathname } = this.props.location;
    const { userData } = this.props.authManage;

    const roles = ['pesquisador', 'jornalista', 'produtor', 'editor'].filter(role => {
      return userData[role];
    });

    const linksPanel = roles.map(role => {
      return (
        <Link
          key={role}
          className={`btn btn-blue btn-inline btn-big ${
            pathname.endsWith(role) ? 'active' : ''
          }`}
          id={role}
          to={pathname.endsWith(role) ? url : `${url}/${role}`}
        >
          Painel de {role}
        </Link>
      );
    });

    return (
      <Main title='Paineis de usuarios'>
        <div id='panelButtons'>{linksPanel}</div>

        <Switch>
          <Route path={`${url}/pesquisador`}>
            <Researcher authManage={this.props.authManage} />
          </Route>
        </Switch>
      </Main>
    );
  }
}
