// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_WALLET = 'ADD_WALLET';
export const EDIT_WALLET = 'EDIT_WALLET';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const addWallet = (wallet) => ({
  type: ADD_WALLET,
  wallet,
});

export const editWallet = (walletSelect) => ({
  type: EDIT_WALLET,
  walletSelect,
});
