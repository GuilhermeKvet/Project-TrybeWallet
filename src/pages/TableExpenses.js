import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/tableExpenses.css';
import { deleteExpenses, editExpenses } from '../actions';

function TableExpenses({ dispatch, expenses }) {
  const handleDeleteButton = ({ target }) => {
    const { value } = target;
    const deletedExpense = expenses.find((expense) => expense.id === Number(value));
    dispatch(deleteExpenses(deletedExpense));
  };

  const handleEditButton = ({ target }) => {
    const { value } = target;
    dispatch(editExpenses(value));
  };

  const createExpense = () => {
    const newExpense = expenses.map((expense) => {
      const userCurreny = expense.exchangeRates[expense.currency];
      const exchangeUsed = Number(userCurreny.ask);
      const convertedValue = Number(exchangeUsed * expense.value);
      const createTrExpense = (
        <tbody key={ expense.id } className="table-group-divider">
          <tr key={ expense.id }>
            <td className="titleExpense">{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ Number(expense.value).toFixed(2) }</td>
            <td>{ userCurreny.name.split('/')[0] }</td>
            <td>{ exchangeUsed.toFixed(2) }</td>
            <td>{ convertedValue.toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button
                type="button"
                className="buttonEdit"
                data-testid="edit-btn"
                value={ expense.id }
                onClick={ handleEditButton }
              >
                Editar
              </button>
              <button
                type="button"
                className="buttonDel"
                data-testid="delete-btn"
                value={ expense.id }
                onClick={ handleDeleteButton }
              >
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      );
      return createTrExpense;
    });
    return newExpense;
  };

  return (
    <div className="tableExpenses">
      <table>
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        { createExpense() }
      </table>
    </div>
  );
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TableExpenses);
