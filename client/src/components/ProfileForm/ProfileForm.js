import React, { Component } from 'react';
import CheckboxList from '../CheckboxList/CheckboxList';

export default class ProfileForm extends Component {
  handleChangeCpf = (event, disableCpf, handleChange) => {
    if (disableCpf) {
      return;
    } else {
      handleChange(event);
    }
  };

  render() {
    const {
      handleSubmit,
      handleChange,
      name,
      cpf,
      disableCpf,
      phone,
      roles
    } = this.props;

    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Nome *'
            value={name}
            onChange={handleChange}
          />
          <input
            type='text'
            name='cpf'
            placeholder='CPF *'
            value={cpf}
            disabled={disableCpf}
            onChange={e => {
              this.handleChangeCpf(e, disableCpf, handleChange);
            }}
          />
          <input
            type='text'
            name='phone'
            placeholder='Telefone'
            value={phone}
            onChange={handleChange}
          />
          <CheckboxList
            title='Cargos'
            checkboxStates={roles}
            handleChange={handleChange}
          />
          <input
            type='submit'
            value='Cadastrar'
            style={{
              float: 'right',
              marginTop: '-30px'
            }}
          />
        </form>
        <p>Itens com (*) são obrigatórios</p>
      </>
    );
  }
}
