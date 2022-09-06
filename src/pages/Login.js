import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionSaveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      login: false,
      validPassWord: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        login: this.inputValidation(),
      });
    });
  }

  validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  inputValidation = () => {
    const { senha, email } = this.state;
    const MIN_PASSWORD_LENGTH = 6;
    if (senha.length >= MIN_PASSWORD_LENGTH
      && this.validateEmail(email)) {
      this.setState({
        validPassWord: true,
      });
      return true;
    }
    this.setState({
      validPassWord: false,
    });
    return false;
  }

  loginWallet = () => {
    const { sendEmail, history } = this.props;
    const { email } = this.state;
    sendEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, senha, login, validPassWord } = this.state;

    return (
      <main className="login-screen">
        <div className="login-container">
          <h1 className="login-title">LOGIN</h1>
          <input
            className="login-input"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="E-mail"
          />
          <input
            className="login-input"
            type="text"
            name="senha"
            value={ senha }
            onChange={ this.handleChange }
            placeholder="Senha"
          />
          <button
            className="login-input"
            type="button"
            disabled={ !login }
            onClick={ this.loginWallet }
          >
            Entrar
          </button>
          <span className="password-msg">
            {
              validPassWord
                ? ''
                : '*A senha necessita de ao menos 6 caracteres'
            }
          </span>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(actionSaveEmail(email)),
});

Login.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
