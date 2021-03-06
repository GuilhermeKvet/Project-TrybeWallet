import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Header({ email, expenses }) {
  const sumValues = () => {
    if (expenses.length === 0) return 0;
    let count = 0;
    expenses.map((expense) => {
      const value = Number(expense.value);
      const exchanges = Object.values(expense.exchangeRates);
      const userCurrencys = exchanges.filter((exchange) => (
        exchange.code === expense.currency
      ));
      const patternValue = Number(userCurrencys[0].ask);
      const converted = Number((value * patternValue));
      count += converted;
      return count;
    });
    return count.toFixed(2);
  };

  return (
    <div>
      <header className="headerWallet">
        <h1 className="titleWallet">
          WALLET
          <i className="fa-solid fa-money-check-dollar" />
        </h1>
        <h5 data-testid="email-field">
          <i className="fa-solid fa-user-check" />
          {` ${email}`}
        </h5>
        <h5 data-testid="total-field">{ sumValues() }</h5>
        <h5 data-testid="header-currency-field">BRL</h5>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
