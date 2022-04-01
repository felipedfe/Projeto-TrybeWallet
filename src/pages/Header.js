import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div className="header-container">
        <h3>Header</h3>
        <p data-testid="email-field">
          E-mail:
          {email}
        </p>
        <p data-testid="total-field">
          Despesa Total: R$
          {0}
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
});

export default connect(mapStateToProps)(Header);
