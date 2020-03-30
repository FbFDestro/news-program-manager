import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
      isLoadingUserData: true,
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
      this.setState({ isLoadingUserData: false, isLogged, userData });
    } else {
      this.setState({ isLoadingUserData: false });
    }
  };

  loginUser = async userData => {
    await this.setStateAsync({ isLoadingUserData: false, isLogged: true, userData });
    this.setLocalStorage();
  };

  logoutUser = async () => {
    await this.setStateAsync({
      isLoadingUserData: false,
      isLogged: false,
      userData: null
    });
    this.setLocalStorage();
  };

  /*
  componentWillUnmount() {
    localStorage.clear();
  }
  */

  render() {
    const authManage = {
      ...this.state,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser
    };

    const isLogged = !this.state.isLogged && !this.state.isLoadingUserData;

    return (
      <Router>
        <Header authManage={authManage} />

        <Switch>
          <Route
            exact
            path='/'
            render={routeProps => <Index {...routeProps} authManage={authManage} />}
          />
          <Route
            path='/paineis'
            render={routeProps =>
              isLogged ? (
                <Redirect to='/' />
              ) : (
                <UserPanel {...routeProps} authManage={authManage} />
              )
            }
          />
          <Route path='/cadastro' render={routeProps => <SignUp {...routeProps} />} />
          <Route path='*' render={() => <Main title='Erro 404' />} />
        </Switch>

        <Footer />
      </Router>
    );
  }
}
