import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/wallet.css';
import { fetchCurrencies } from '../actions';

function Wallet({ dispatch, email }) {
  const stateWallet = {
    total: 0,
  };

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const [userWallet] = useState(stateWallet);
  return (
    <div>
      <header className="headerWallet">
        <h2 data-testid="email-field">{`Email: ${email}`}</h2>
        <h2 data-testid="total-field">{`Despesa Total: R$${userWallet.total}`}</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
