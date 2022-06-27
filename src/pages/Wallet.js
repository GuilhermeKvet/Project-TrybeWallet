import React from 'react';
import FormsExpenses from './FormsExpenses';
import Header from './Header';
import TableExpenses from './TableExpenses';

function Wallet() {
  return (
    <div className="wallet-container">
      <Header />
      <FormsExpenses />
      <TableExpenses />
    </div>
  );
}

export default Wallet;
