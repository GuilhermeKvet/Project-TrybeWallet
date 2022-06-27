// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_CURRENCIES,
  ADD_EXPENSES,
  ADD_EXCHANGERATES,
  DELETE_EXPENSES,
  // ADD_WALLET,
  // EDIT_WALLET,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0,
  exchangeRates: {}, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT'),
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case ADD_EXCHANGERATES:
    return {
      ...state,
      exchangeRates: action.rates,
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense !== action.deleteExpense),
    };
  default:
    return state;
  }
};

export default wallet;
