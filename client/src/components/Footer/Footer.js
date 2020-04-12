import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div id='rodape'>
          <p>
            developedBy = ['Fabio Destro', 'Paulo Carneiro', 'Renata Vinhaga', 'Vitor
            Gratiere'];
          </p>
          <p>
            sourceCode ={' '}
            <a href='https://github.com/FbFDestro/gerenciadorJornal'>Github</a>;
          </p>
        </div>
      </footer>
    );
  }
}
