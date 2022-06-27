import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/wallet.css';
import { fetchCurrencies, fetchExchangeRates } from '../actions';
import Header from './Header';

function Wallet({ dispatch, currencies }) {
  const count = {
    id: 0,
  };

  const stateWallet = {
    total: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'din',
    tag: 'alimentacao',
  };

  const [userWallet, setUserWallet] = useState(stateWallet);
  const [idExpense, setId] = useState(count);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserWallet({
      ...userWallet,
      [name]: value,
    });
  };

  const saveExpeses = () => {
    setId((prevState) => ({ ...prevState, id: idExpense.id + 1 }));
    const userExpense = {
      id: idExpense.id,
      value: userWallet.value,
      description: userWallet.description,
      currency: userWallet.currency,
      method: userWallet.method,
      tag: userWallet.tag,
    };
    dispatch(fetchExchangeRates(userExpense));
    setUserWallet({
      total: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  };

  return (
    <div className="wallet-container">
      <Header />
      <div className="formWallet">
        <label htmlFor="inputValue" className="label">
          Valor:
          <input
            className="input-group-text"
            type="number"
            id="inputValue"
            data-testid="value-input"
            name="value"
            value={ userWallet.value }
            onChange={ handleChange }
          />
        </label>
        <br />
        <label htmlFor="inputDescription" className="label">
          Descrição:
          <input
            className="input-group-text"
            type="text"
            id="inputDescription"
            data-testid="description-input"
            name="description"
            value={ userWallet.description }
            onChange={ handleChange }
          />
        </label>
        <br />
        <label htmlFor="inputCurrency" className="label">
          Moeda:
          <select
            className="form-select"
            id="inputCurrency"
            onChange={ handleChange }
            name="currency"
          >
            { currencies.map((currency) => (
              <option
                value={ currency }
                key={ currency }
              >
                {currency}
              </option>
            )) }
          </select>
        </label>
        <br />
        <label htmlFor="method" className="label">
          Modo de pagamento:
          <select
            className="form-select"
            id="method"
            data-testid="method-input"
            onChange={ handleChange }
            name="method"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <br />
        <label htmlFor="tag" className="label">
          Categoria:
          <select
            className="form-select"
            id="tag"
            data-testid="tag-input"
            onChange={ handleChange }
            name="tag"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <br />
        <button
          className="buttonWallet"
          type="button"
          onClick={ saveExpeses }
        >
          Adicionar despesa
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.exchangeRates,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps)(Wallet);
