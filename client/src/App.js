import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Index from './components/Index/Index';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    /*this.callBackendAPI()
      .then(res => {
        this.setState({ data: res });
      })
      .catch(err => console.log(err));
      */
  }

  callBackendAPI = async () => {
    const response = await fetch('/api/pessoas/');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <>
        <Header />

        <Main title='Faça login para utilizar o sistema como um dos usuarios'>
          <Index />
        </Main>
      </>
    );
  }
}
