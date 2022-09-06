export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const actionSaveEmail = (value) => ({
  type: SAVE_EMAIL,
  value,
});

export const actionSaveCurrencies = (value) => ({
  type: SAVE_CURRENCIES,
  value,
});

export const actionSaveExpenses = (value) => ({
  type: SAVE_EXPENSES,
  value,
});

export const actionDeleteExpense = (value) => ({
  type: DELETE_EXPENSE,
  value,
});

export const actionGetCotacao = (objetoDespesa) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT;
  const exchangeRates = data;
  dispatch(actionSaveExpenses({ ...objetoDespesa, exchangeRates }));
};

export const actionGetCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const dataList = Object.keys(data); // tranformando em um array
  const filteredData = dataList.filter((sigla) => sigla !== 'USDT'); // tirando 'USDT' da lista
  return dispatch(actionSaveCurrencies(filteredData));
};
