import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Index from './components/Index/Index';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import UserPanel from './components/UserPanel/UserPanel';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      userData: null
    };
  }

  componentDidMount() {
    const isLogged = localStorage.getItem('isLogged');
    const userData = localStorage.getItem('userData');
    if (isLogged === null && userData === null) {
      this.setLocalStorage();
      console.log('setLocalStorage');
    } else {
      this.getLocalStorage();
      console.log('getLocalStorage');
    }
  }

  setStateAsync = state => {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  };

  // set local Storage based on state
  setLocalStorage = () => {
    const { isLogged, userData } = this.state;
    localStorage.setItem('isLogged', JSON.stringify(isLogged));
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // get local storage and set state
  getLocalStorage = () => {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'));
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (isLogged !== null && userData !== null) {
      this.setState({ isLogged, userData });
    }
  };

  loginUser = async userData => {
    await this.setStateAsync({ isLogged: true, userData });
    this.setLocalStorage();
  };

  logoutUser = () => {
    this.setState({ isLogged: false, userData: null });
    this.setLocalStorage();
  };

  /*
  componentWillUnmount() {
    localStorage.clear();
  }
  */

  render() {
    return (
      <Router>
        <Header />

        <Switch>
          <Route
            exact
            path='/'
            render={routeProps => <Index {...routeProps} login={this.loginUser} />}
          />
          <Route
            path='/paineis'
            render={routeProps => <UserPanel {...routeProps} login={this.loginUser} />}
          />
          <Route path='/cadastro' render={routeProps => <SignUp {...routeProps} />} />
          <Route path='*' render={() => <Main title='Erro 404' />} />
        </Switch>

        <Footer />
      </Router>
    );
  }
}
