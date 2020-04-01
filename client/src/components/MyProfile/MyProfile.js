import React, { Component } from 'react';

export default class MyProfile extends Component {
  render() {
    return (
      <Main title='Meu Perfil - Atualizar registro'>
        <>
          <ProfileForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            name={this.state.name}
            cpf={this.state.cpf}
            disableCpf={true}
            phone={this.state.phone}
            roles={this.state.roles}
          />

          {alertBox}
        </>
      </Main>
    );
  }
}
