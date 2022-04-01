import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
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
    this.setState({
      value: '',
      description: '',
    });
    fetchCotacao({ id: index, ...this.state });
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
        <Header />
        <h3>Wallet</h3>
        <fieldset>
          <label htmlFor="value">
            Valor:
            <input
              name="value"
              type="text"
              value={ value }
              onChange={ this.handleInputChange }
              data-testid="value-input"
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              type="text"
              value={ description }
              onChange={ this.handleInputChange }
              data-testid="description-input"
            />
          </label>

          <label htmlFor="moeda">
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

          <label htmlFor="method-input">
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

          <label htmlFor="tag-input">
            <select
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
              type="button"
              onClick={ () => this.onSubmitForm(expenseIndex) }
            >
              Adicionar despesa
            </button>
          </label>
        </fieldset>
        <h3>Tabela</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
