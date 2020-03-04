import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Index from './components/Index/Index';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />

        <Switch>
          <Route exact path='/'>
            <Index />
          </Route>
          <Route path='/cadastro'>
            <SignUp />
          </Route>
          <Route path='*'>
            <Main title='Erro 404' />
          </Route>
        </Switch>

        <Footer />
      </Router>
    );
  }
}
