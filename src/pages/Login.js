import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../actions';
import Finance from '../Finance.png';
import '../styles/login.css';

function Login({ dispatch, history }) {
  const login = {
    email: '',
    password: '',
    isValid: true,
  };

  const [loginForm, setLoginForm] = useState(login);

  const validateForm = () => {
    const emailFormater = /\S+@\S+\.\S+/;
    const SIX = 6;

    if (emailFormater.test(loginForm.email) && loginForm.password.length + 1 >= SIX) {
      setLoginForm((prevState) => ({ ...prevState, isValid: false }));
    } else {
      setLoginForm((prevState) => ({ ...prevState, isValid: true }));
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
    if (name === 'email') validateForm();
    if (name === 'password') validateForm();
  };

  return (
    <div className="loginPage">
      <h1 className="loginTitle">
        WALLET
      </h1>
      <div className="loginItens">
        <img
          className="imageWallet"
          src={ Finance }
          alt="Duas pessoas controlando despesas"
          width="700px"
        />
        <form className="formLogin">
          <h1>Login</h1>
          <br />
          <label htmlFor="inputEmail">
            <input
              className="inputEmail"
              type="email"
              id="inputEmail"
              placeholder="Email"
              data-testid="email-input"
              name="email"
              value={ loginForm.email }
              onChange={ handleChange }
            />
          </label>
          <br />
          <label htmlFor="inputPassword">
            <input
              className="inputPassword"
              type="password"
              id="inputPassword"
              placeholder="Senha"
              data-testid="password-input"
              name="password"
              value={ loginForm.password }
              onChange={ handleChange }
            />
          </label>
          <br />
          <button
            className="buttonLogin"
            type="button"
            disabled={ loginForm.isValid }
            onClick={ () => dispatch(addEmail(loginForm.email))
              && history.push('/carteira') }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
};

export default connect()(Login);
