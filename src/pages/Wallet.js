import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Wallet({ email }) {
  return (
    <div>
      <header>
        <h2>{`Email: ${email}`}</h2>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
