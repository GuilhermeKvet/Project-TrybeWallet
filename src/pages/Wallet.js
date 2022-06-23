import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/wallet.css';
import { fetchCurrencies } from '../actions';

function Wallet({ dispatch, email, currencies }) {
  const stateWallet = {
    total: 0,
  };

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const [userWallet] = useState(stateWallet);
  return (
    <div className="wallet-container">
      <header className="headerWallet">
        <h2 data-testid="email-field">{`Email: ${email}`}</h2>
        <h2 data-testid="total-field">{`Despesa Total: R$${userWallet.total}`}</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </header>
      <div className="formWallet">
        <label htmlFor="inputValue">
          Valor:
          <input
            type="number"
            id="inputValue"
            data-testid="value-input"
          />
        </label>
        <br />
        <label htmlFor="inputDescription">
          Descrição:
          <input
            type="text"
            id="inputDescription"
            data-testid="description-input"
          />
        </label>
        <br />
        <label htmlFor="inputCurrency">
          Moeda:
          <select id="inputCurrency">
            { currencies.map((currency) => (
              <option value={ currency } key={ currency }>{currency}</option>
            )) }
          </select>
        </label>
        <br />
        <label htmlFor="method">
          Modo de pagamento:
          <select id="method" data-testid="method-input">
            <option value="din">Dinheiro</option>
            <option value="cred">Cartão de crédito</option>
            <option value="deb">Cartão de débito</option>
          </select>
        </label>
        <br />
        <label htmlFor="tag">
          Categoria:
          <select id="tag" data-testid="tag-input">
            <option value="din">Alimentação</option>
            <option value="cred">Lazer</option>
            <option value="deb">Trabalho</option>
            <option value="deb">Transporte</option>
            <option value="deb">Saúde</option>
          </select>
        </label>
      </div>

    </div>
  );
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Wallet);
