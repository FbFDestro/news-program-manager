import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => {
        this.setState({ data: res });
      })
      .catch(err => console.log(err));
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
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code> and save to reload. Test
          </p>
          <p>{this.state.data && this.state.data.length}</p>
        </header>
      </div>
    );
  }
}

export default App;
