// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_WALLET = 'ADD_WALLET';
export const EDIT_WALLET = 'EDIT_WALLET';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_EXCHANGERATES = 'ADD_EXCHANGERATES';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const addWallet = (wallet) => ({
  type: ADD_WALLET,
  wallet,
});

export const addExpenses = (expense) => ({
  type: ADD_EXPENSES,
  expense,
});

export const editWallet = (walletSelect) => ({
  type: EDIT_WALLET,
  walletSelect,
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
      .then((currencies) => dispatch(receiveCurrencies(currencies)));
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
