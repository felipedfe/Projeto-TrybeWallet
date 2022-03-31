import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { actionGetCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
        <h3>Wallet</h3>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(actionGetCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);
