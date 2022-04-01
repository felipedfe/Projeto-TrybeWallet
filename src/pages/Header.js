import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expensesList } = this.props;

    return (
      <div className="header-container">
        <h3>Header</h3>
        <p data-testid="email-field">
          E-mail:
          {email}
        </p>
        <p data-testid="total-field">
          {expensesList.length > 0
            ? expensesList
              .reduce((acc, despesa) => acc + (parseFloat(despesa.value)
            * parseFloat(despesa.exchangeRates[despesa.currency].ask)), 0).toFixed(2)
            : <span>0</span>}
        </p>
        <p data-testid="header-currency-field">
          Câmbio:
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
