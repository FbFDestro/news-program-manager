import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import Researcher from './Researcher/Researcher';
import Journalist from './Journalist/Journalist';
import Producer from './Producer/Producer';
import Editor from './Editor/Editor';

export default class Panels extends Component {
  privateComponent = (role, Component) => {
    return this.props.authManage.userData[role] ? Component : <Redirect to='/paineis' />;
  };

  render() {
    const { url } = this.props.match;
    const { pathname } = this.props.location;
    const { userData } = this.props.authManage;

    const roles = ['pesquisador', 'jornalista', 'produtor', 'editor'].filter((role) => {
      return userData[role];
    });

    const linksPanel = roles.map((role) => {
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
          <Route
            path={`${url}/pesquisador`}
            render={() =>
              this.privateComponent(
                'pesquisador',
                <Researcher authManage={this.props.authManage} />
              )
            }
          />
          <Route
            path={`${url}/jornalista`}
            render={() =>
              this.privateComponent(
                'jornalista',
                <Journalist authManage={this.props.authManage} />
              )
            }
          />{' '}
          <Route
            path={`${url}/produtor`}
            render={() =>
              this.privateComponent(
                'produtor',
                <Producer authManage={this.props.authManage} />
              )
            }
          />
          <Route
            path={`${url}/editor`}
            render={() =>
              this.privateComponent(
                'editor',
                <Editor authManage={this.props.authManage} />
              )
            }
          />
        </Switch>
      </Main>
    );
  }
}
