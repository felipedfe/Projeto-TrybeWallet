import React from 'react';
import { connect } from 'react-redux';
import { actionSaveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      isDisabled: true,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        isDisabled: this.inputValidation(),
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
      return false;
    }
    return true;
  }

  loginWallet = () => {
    const { sendEmail, history } = this.props;
    const { email } = this.state;
    sendEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, senha, isDisabled } = this.state;
    // console.log(this.props.history);
    return (
      <div className="login-container">
        <input
          type="text"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          data-testid="email-input"
          placeholder="E-mail"
        />
        <input
          type="text"
          name="senha"
          value={ senha }
          onChange={ this.handleChange }
          data-testid="password-input"
          placeholder="Senha"
        />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.loginWallet }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => dispatch(actionSaveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
