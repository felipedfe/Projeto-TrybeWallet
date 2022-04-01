import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { actionGetCurrencies, actionSaveExpenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      descricao: '',
      moeda: 'USD',
      metodoDePagamento: 'Dinheiro',
      tipoDeDespesa: 'Alimentação',
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
    const { saveFormData } = this.props;
    saveFormData({ id: index, ...this.state });

    console.log({ id: index, ...this.state });
  }

  render() {
    const { currenciesList, expenseIndex } = this.props;
    const { valor,
      descricao,
      moeda,
      metodoDePagamento,
      tipoDeDespesa } = this.state;

    return (
      <div className="wallet-container">
        <Header />
        <h3>Wallet</h3>
        <fieldset>
          <label htmlFor="valor">
            Valor:
            <input
              name="valor"
              type="text"
              value={ valor }
              onChange={ this.handleInputChange }
              data-testid="value-input"
            />
          </label>

          <label htmlFor="descricao">
            Descrição:
            <input
              name="descricao"
              type="text"
              value={ descricao }
              onChange={ this.handleInputChange }
              data-testid="description-input"
            />
          </label>

          <label htmlFor="moeda">
            Moeda:
            <select
              name="moeda"
              id="moeda"
              value={ moeda }
              onChange={ this.handleInputChange }
            >
              {currenciesList.map((sigla) => (
                <option key={ sigla } value={ sigla }>{sigla}</option>
              ))}
            </select>
          </label>

          <label htmlFor="metodoDePagamento">
            <select
              data-testid="method-input"
              name="metodoDePagamento"
              value={ metodoDePagamento }
              onChange={ this.handleInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tipoDeDespesa">
            <select
              data-testid="tag-input"
              name="tipoDeDespesa"
              value={ tipoDeDespesa }
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
  saveFormData: (data) => dispatch(actionSaveExpenses(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
