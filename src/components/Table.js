import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDeleteExpense } from '../actions';

class Table extends React.Component {
  render() {
    const { infoDespesas, deleteExpense } = this.props;

    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {infoDespesas.length > 0
            && infoDespesas.map((despesa) => (
              <tr key={ despesa.id }>
                <td>{despesa.description}</td>
                <td>{despesa.tag}</td>
                <td>{despesa.method}</td>
                <td>{(despesa.value * 1).toFixed(2)}</td>
                <td>{despesa.exchangeRates[despesa.currency].name}</td>
                <td>{(despesa.exchangeRates[despesa.currency].ask * 1).toFixed(2)}</td>
                <td>
                  {(despesa.value * despesa.exchangeRates[despesa.currency].ask)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={ () => deleteExpense(despesa.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  infoDespesas: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(actionDeleteExpense(id)),
});

Table.propTypes = {
  infoDespesas: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
