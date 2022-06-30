// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_EXCHANGERATES = 'ADD_EXCHANGERATES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const EDITED_EXPENSES = 'EDITED_EXPENSES';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const addExpenses = (expense) => ({
  type: ADD_EXPENSES,
  expense,
});

export const deleteExpenses = (deleteExpense) => ({
  type: DELETE_EXPENSES,
  deleteExpense,
});

export const editExpenses = (id) => ({
  type: EDIT_EXPENSES,
  id,
});

export const editedExpenses = (expenseEdited) => ({
  type: EDITED_EXPENSES,
  expenseEdited,
});

export const receiveCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  currencies,
});

export const receiveExchangeRates = (rates) => ({
  type: ADD_EXCHANGERATES,
  rates,
});

export function fetchCurrencies() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => {
        dispatch(receiveCurrencies(currencies));
        dispatch(receiveExchangeRates(currencies));
      });
  };
}

export function fetchExchangeRates(obj) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((exchangeRates) => {
        const result = {
          ...obj,
          exchangeRates,
        };
        dispatch(addExpenses(result));
      });
  };
}
