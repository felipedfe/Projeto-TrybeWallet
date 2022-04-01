// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_CURRENCIES, SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.value,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };
  default:
    return state;
  }
};

export default wallet;
