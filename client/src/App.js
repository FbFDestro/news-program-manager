import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Index from './components/Index/Index';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import Panels from './components/Panels/Panels';
import MyProfile from './components/MyProfile/MyProfile';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: JSON.parse(localStorage.getItem('isLogged')),
      userData: JSON.parse(localStorage.getItem('userData')),
    };
  }

  setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  };

  // set local Storage based on state
  setLocalStorage = () => {
    const { isLogged, userData } = this.state;
    localStorage.setItem('isLogged', JSON.stringify(isLogged));
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  loginUser = async (userData) => {
    await this.setStateAsync({ isLogged: true, userData });
    this.setLocalStorage();
  };

  logoutUser = async () => {
    await this.setStateAsync({
      isLogged: false,
      userData: null,
    });
    this.setLocalStorage();
  };

  privateComponent = (Component) => {
    return this.state.isLogged ? Component : <Redirect to='/' />;
  };

  render() {
    const authManage = {
      ...this.state,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser,
    };

    return (
      <Router>
        <Route
          path='*'
          render={(routeProps) => <Header {...routeProps} authManage={authManage} />}
        />

        <Switch>
          <Route
            exact
            path='/'
            render={(routeProps) => <Index {...routeProps} authManage={authManage} />}
          />

          <Route
            path='/paineis'
            render={(routeProps) =>
              this.privateComponent(<Panels {...routeProps} authManage={authManage} />)
            }
          />

          <Route path='/cadastro' render={(routeProps) => <SignUp {...routeProps} />} />

          <Route
            path='/meuPerfil'
            render={(routeProps) =>
              this.privateComponent(<MyProfile {...routeProps} authManage={authManage} />)
            }
          />

          <Route path='*' render={() => <Main title='Erro 404' />} />
        </Switch>

        <Footer />
      </Router>
    );
  }
}
