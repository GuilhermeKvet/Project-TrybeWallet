// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_CURRENCIES,
  ADD_EXPENSES,
  ADD_EXCHANGERATES,
  DELETE_EXPENSES,
  EDIT_EXPENSES,
  EDITED_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  exchangeRates: {},
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
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case EDITED_EXPENSES:
    return {
      ...state,
      expenses: action.expenseEdited,
      idToEdit: 0,
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
