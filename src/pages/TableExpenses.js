import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/tableExpenses.css';

function TableExpenses({ expenses }) {
  const createExpense = () => {
    const newExpense = expenses.map((expense) => {
      const exchanges = Object.values(expense.exchangeRates);
      const userCurrencys = exchanges.filter((exchange) => (
        exchange.code === expense.currency
      ));
      const exchangeUsed = Number(userCurrencys[0].ask);
      const convertedValue = Number(exchangeUsed * expense.value);
      const createTrExpense = (
        <tbody className="table-group-divider">
          <tr key={ expense.id }>
            <td className="titleExpense">{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ Number(expense.value).toFixed(2) }</td>
            <td>{ userCurrencys[0].name }</td>
            <td>{ exchangeUsed.toFixed(2) }</td>
            <td>{ convertedValue.toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button
                type="button"
                className="buttonEdit"
                // onClick={ }
              >
                Editar
              </button>
              <button
                type="button"
                className="buttonDel"
                // onClick={  }
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
};

export default connect(mapStateToProps)(TableExpenses);
