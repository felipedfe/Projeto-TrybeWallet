import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expensesList } = this.props;
    // console.log(expensesList);
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

export default connect(mapStateToProps)(Header);
