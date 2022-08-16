import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expensesList } = this.props;

    return (
      <div className="header-container">
        <p className="email-field">
          E-mail:
          {' '}
          {email}
        </p>
        <p className="expenses-field">
          Despesa Total:
          {' '}
          {expensesList.length > 0
            ? expensesList
              .reduce((acc, despesa) => acc + (parseFloat(despesa.value)
            * parseFloat(despesa.exchangeRates[despesa.currency].ask)), 0).toFixed(2)
            : <span>0</span>}
        </p>
        <p className="currency-field">
          {' '}
          {'BRL'}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expensesList: state.wallet.expenses,
});

Header.propTypes = {
  expensesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
