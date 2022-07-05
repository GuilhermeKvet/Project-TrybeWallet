import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editedExpenses,
  fetchCurrencies,
  fetchExchangeRates,
} from '../actions';
import '../styles/formsExpenses.css';

function FormsExpenses({
  dispatch,
  currencies,
  editor,
  idToEdit,
  expenses }) {
  const alimentacao = 'Alimentação';
  const count = {
    id: 0,
  };

  const initialWallet = {
    total: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: alimentacao,
  };

  const [userWallet, setUserWallet] = useState(initialWallet);
  const [idExpense, setId] = useState(count);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  useEffect(() => {
    const getExchange = expenses.find((expense) => expense.id === Number(idToEdit));
    if (editor) {
      setUserWallet({
        total: Number(idToEdit),
        value: getExchange.value,
        description: getExchange.description,
        currency: getExchange.currency,
        method: getExchange.method,
        tag: getExchange.tag,
      });
    }
  }, [expenses, idToEdit, editor]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserWallet({
      ...userWallet,
      [name]: value,
    });
  };

  const saveExpeses = async () => {
    setId((prevState) => ({ ...prevState, id: idExpense.id + 1 }));
    const userExpense = {
      id: idExpense.id,
      value: userWallet.value,
      description: userWallet.description,
      currency: userWallet.currency,
      method: userWallet.method,
      tag: userWallet.tag,
    };
    await dispatch(fetchExchangeRates(userExpense));
    setUserWallet(initialWallet);
  };

  const editExpeses = () => {
    const userEditExpense = {
      id: Number(idToEdit),
      value: userWallet.value,
      description: userWallet.description,
      currency: userWallet.currency,
      method: userWallet.method,
      tag: userWallet.tag,
      exchangeRates: expenses[0].exchangeRates,
    };
    const newExpenses = expenses.map((expense) => {
      if (expense.id === Number(idToEdit)) {
        expense = userEditExpense;
      }
      return expense;
    });
    dispatch(editedExpenses(newExpenses));
    setUserWallet(initialWallet);
  };

  return (
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
          value={ userWallet.currency }
          name="currency"
        >
          {currencies.map((currency) => (
            <option value={ currency } key={ currency }>
              {currency}
            </option>
          ))}
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
          value={ userWallet.method }
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
          value={ userWallet.tag }
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
      { editor
        ? (
          <button className="buttonWallet" type="button" onClick={ editExpeses }>
            Editar despesa
          </button>
        ) : (
          <button className="buttonWallet" type="button" onClick={ saveExpeses }>
            Adicionar despesa
          </button>
        )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

FormsExpenses.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FormsExpenses);
