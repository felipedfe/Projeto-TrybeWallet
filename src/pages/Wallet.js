import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import Table from '../components/Table';
import { actionGetCurrencies, actionGetCotacao } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  onSubmitForm = (index) => {
    const { fetchCotacao } = this.props;
    fetchCotacao({ id: index, ...this.state });
    this.setState({
      value: '',
      description: '',
    });
  }

  render() {
    const { currenciesList, expenseIndex } = this.props;
    const { value,
      description,
      currency,
      method,
      tag } = this.state;

    return (
      <div className="wallet-container">
        <div className="title-container">
          <span className="emoji" role="img" aria-label="saco com cifrão">&#128176;</span>
          <h1 className="title">TRYBEWALLET</h1>
          <span className="emoji" role="img" aria-label="dinheiro voando">&#128184;</span>
        </div>
        <Header />
        <fieldset className="wallet-fieldset">
          <label className="wallet-field" htmlFor="value">
            Valor:
            <input
              name="value"
              type="text"
              value={ value }
              onChange={ this.handleInputChange }
              data-testid="value-input"
            />
          </label>

          <label className="wallet-field" htmlFor="description">
            Descrição:
            <input
              name="description"
              type="text"
              value={ description }
              onChange={ this.handleInputChange }
              data-testid="description-input"
            />
          </label>

          <label className="wallet-field" htmlFor="moeda">
            Moeda:
            <select
              name="currency"
              id="moeda"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleInputChange }
            >
              {currenciesList.map((sigla) => (
                <option key={ sigla } value={ sigla }>{sigla}</option>
              ))}
            </select>
          </label>

          <label className="wallet-field" htmlFor="method-input">
            <select
              data-testid="method-input"
              id="method-input"
              name="method"
              value={ method }
              onChange={ this.handleInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label className="wallet-field" htmlFor="tag-input">
            <select
              className="wallet-field"
              data-testid="tag-input"
              id="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>

            <button
              className="btn btn-primary add-btn"
              type="button"
              onClick={ () => this.onSubmitForm(expenseIndex) }
            >
              Adicionar despesa
            </button>

          </label>
        </fieldset>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
  expenseIndex: (state.wallet.expenses).length, // para setar o id despesa (valor do tamanho do array)
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(actionGetCurrencies()),
  fetchCotacao: (data) => dispatch(actionGetCotacao(data)),
});

Wallet.propTypes = {
  currenciesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  fetchCotacao: PropTypes.func.isRequired,
  expenseIndex: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
