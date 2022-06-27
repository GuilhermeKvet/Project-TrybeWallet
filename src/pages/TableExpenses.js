import React from 'react';
import '../styles/tableExpenses.css';

function TableExpenses() {
  return (
    <div className="tableExpenses">
      <table border="1">
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </table>
    </div>
  );
}

export default TableExpenses;
