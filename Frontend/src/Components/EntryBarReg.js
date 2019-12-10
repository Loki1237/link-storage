import React from 'react';
import './EntryBar.css';

class EntryBarReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      name: "",
      login: "",
      password: "",
      PINcode: "",
      highlighting: {
        name: false,
        login: false,
        password: false,
        PINcode: false
      },
      regError: {
        incorrectName: false,
        incorrectLogin: false,
        incorrectPassword: false,
        shortPassword: false,
        incorrectPINcode: false,
      },
      serverError: false,
      loginError: false,
      confirmRegistration: false,
      successfulRegistration: false
    }
  }

  highlighting( field ) {
    this.setState({ highlighting: { [field]: true } });
    setTimeout( () => {
      this.setState({ highlighting: false })
    }, 400 )
  }

  checkOfName() {
    for( let symbol of this.state.name ) {
      if( !/[a-z A-Z а-я А-Я]/.test(symbol) ) {
        return false
      }
    }
    return true
  }

  checkOfLogin() {
    for( let symbol of this.state.login ) {
      if( !/[a-z A-Z 0-9 _]/.test(symbol) ) {
        return false
      }
    }
    if( isFinite(this.state.login[0]) ) return false
    return true
  }

  checkOfPassword() {
    for( let symbol of this.state.password ) {
      if( !/[a-z A-Z 0-9]/.test(symbol) ) {
        return false
      }
    }
    return true
  }

  confirmRegistration() {
    // Подсветка пустого текстового поля
    if( !this.state.name ) this.highlighting("name");
    if( !this.state.login && this.state.name ) this.highlighting("login");
    if( !this.state.password && this.state.name && this.state.login ) this.highlighting("password");
    if( !this.state.PINcode && this.state.password && this.state.name && this.state.login ) this.highlighting("PINcode");

    // Ошибка: некорректное имя
    if( this.state.name && this.state.login && this.state.password && this.state.PINcode &&
        !this.checkOfName() ) {
      this.setState({ regError: { incorrectName: true } });
      setTimeout( () => { this.setState({ regError: false }) }, 2000 );
    }

    // Ошибка: некорректный логин
    if( this.state.name && this.state.login && this.state.password && this.state.PINcode &&
        this.checkOfName() && !this.checkOfLogin() ) {
      this.setState({ regError: { incorrectLogin: true } });
      setTimeout( () => { this.setState({ regError: false }) }, 2000 );
    }

    // Ошибка: некорректный пароль
    if( this.state.name && this.state.login && this.state.password && this.state.PINcode &&
        this.checkOfName() && this.checkOfLogin() && !this.checkOfPassword() &&
        !this.state.regError.shortPassword ) {
      this.setState({ regError: { incorrectPassword: true } });
      setTimeout( () => { this.setState({ regError: false }) }, 2000 );
    }

    // Ошибка: слишком короткий пароль
    if( this.state.name && this.state.login && this.state.password && this.state.PINcode &&
        this.checkOfName() && this.checkOfLogin() && this.checkOfPassword() &&
        this.state.password.length < 6 && !this.state.regError.shortPassword ) {
      this.setState({ regError: { shortPassword: true } });
      setTimeout( () => { this.setState({ regError: false }) }, 2000 );
    }

    // Ошибка: некорректный PIN-код
    if( this.state.name && this.state.login && this.state.password && this.state.PINcode &&
        this.checkOfName() && this.checkOfLogin() && this.checkOfPassword() &&
        this.state.password.length >= 6 && !this.state.regError.incorrectPINcode && 
        (!isFinite(this.state.PINcode) || this.state.PINcode.length < 4) ) {
      this.setState({ regError: { incorrectPINcode: true } });
      setTimeout( () => { this.setState({ regError: false }) }, 2000 );
    }

    // Если все условия соблюдены - зарегестрировать
    if( this.state.name && this.state.login && this.state.password && this.state.PINcode &&
        this.checkOfName() && this.checkOfLogin() && this.checkOfPassword() &&
        this.state.password.length >= 6 && this.state.PINcode.length === 4 && isFinite(this.state.PINcode) ) {
      let uniqueUser = false;

      fetch(`api/users/${this.state.login}`)
        .then( res => res.json() )
        .then( user => {
          if( user ) {
            this.setState({ loginError: true });
          } 
          if( user === null ) {
            this.setState({ confirmRegistration: true })
          }
        })
        .catch( error => this.setState({ serverError: true }) )
      }
  }

  registration() {
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        id: null,
        name: this.state.name,
        login: this.state.login,
        password: this.state.password,
        PINcode: this.state.PINcode
      })
    }).then(
      res => {
        this.setState({ 
          confirmRegistration: false, 
          successfulRegistration: true 
        })
      },
      err => alert( err )
    )
  }

  render() {
    return (
      <div className="EntryBar">
        <header className="EB-header">
          {/* header */ this.props.elementNames.EntryBar.RegBarHeader}
        </header>

        {/* Ошибка: Пользователь с таким логином уже существует */}
        {this.state.loginError && <div className="EB-error">
          {/* value */ this.props.elementNames.EntryBar.errorOfNotUniqueLogin}
          <button className="EB-error-button-close"
            onClick={ () => {
              this.setState({ loginError: false });
            } }>
          </button>
        </div>}

        {/* Ошибка: сервер временно недоступен */}
        {this.state.serverError && <div className="EB-error">
          {/* value */ this.props.elementNames.EntryBar.errorOfServer}
          <button className="EB-error-button-close"
            onClick={ () => {
              this.setState({ serverError: false });
            } }>
          </button>
        </div>}

        {/*========== И М Я ===========*/}
        <div className="EB-input-field">
          <input type="text"  
            autoComplete="off"
            autoFocus
            className={`EB-input 
              ${this.state.highlighting.name ? "EB-alert" : ""}`}
            value={this.state.name}
            onChange={ (e) => {
              this.setState({ name: e.target.value })
            } } />
          <span className="EB-input-field-name">
            {/* name */ this.props.elementNames.EntryBar.name}
          </span>

          {this.state.regError.incorrectName && <div className="EB-regError">
            {/* value */ this.props.elementNames.EntryBar.regErrorIncorrectName}
          </div>}
        </div>
        
        {/*========== Л О Г И Н  ===========*/}
        <div className="EB-input-field">
          <input type="text" 
            autoComplete="off"
            className={`EB-input 
              ${this.state.highlighting.login ? "EB-alert" : ""}`}
            value={this.state.login}
            onChange={ (e) => {
              this.setState({ login: e.target.value })
            } } />
          <span className="EB-input-field-name">
            {/* name */ this.props.elementNames.EntryBar.login}
          </span>

          {this.state.regError.incorrectLogin && <div className="EB-regError">
            {/* value */ this.props.elementNames.EntryBar.regErrorIncorrectLogin}
          </div>}
        </div>
        
        {/*========== П А Р О Л Ь ===========*/}
        <div className="EB-input-field">
          <input type={this.state.showPassword ? "text" : "password"} 
            autoComplete="off"
            maxLength="12"
            className={`EB-input 
              ${this.state.highlighting.password ? "EB-alert" : ""}`}
            value={this.state.password}
            onChange={ (e) => {
              this.setState({ password: e.target.value })
            } } />
          <span className="EB-input-field-name">
            {/* name */ this.props.elementNames.EntryBar.password}
          </span>

          <div className="EB-eye"
            title={this.props.elementNames.EntryBar.titlePassword}
            onClick={ () => {
              this.setState({showPassword: !this.state.showPassword ? true : false})
            }}>
            {!this.state.showPassword && <div className="EB-eye-slash"></div>}
          </div>

          {this.state.regError.incorrectPassword && <div className="EB-regError">
            {/* value */ this.props.elementNames.EntryBar.regErrorIncorrectPassword}
          </div>}

          {this.state.regError.shortPassword && <div className="EB-regError">
            {/* value */ this.props.elementNames.EntryBar.regErrorVeryShortPassword}
          </div>}
        </div>
        
        {/*========== P I N - C O D E  ===========*/}
        <div className="EB-input-field">
          <input type="text" 
            autoComplete="off"
            maxLength="4"
            className={`EB-input 
              ${this.state.highlighting.PINcode ? "EB-alert" : ""}`}
            value={this.state.PINcode}
            onChange={ (e) => {
              this.setState({ PINcode: e.target.value })
            } } />
          <span className="EB-input-field-name">
            {/* name */ this.props.elementNames.EntryBar.PINcode}
          </span>

          <div className="EB-tip"
            title={this.props.elementNames.EntryBar.titlePINcode}>
              ?
          </div>

          {this.state.regError.incorrectPINcode && <div className="EB-regError">
            {/* value */ this.props.elementNames.EntryBar.regErrorIncorrectPINcode}
          </div>}
        </div>
        
        {/*========== К Н О П К И ===========*/}
        <div className="EB-buttons-container">
          <button className="EB-button"
            onClick={ this.props.open_aut_bar }>
            {/* name */ this.props.elementNames.EntryBar.buttonCancel}
          </button>

          <button className="EB-button"
            onClick={ this.confirmRegistration.bind(this) }>
            {/* name */ this.props.elementNames.EntryBar.buttonContinue}
          </button>
        </div>
        
        {/*========== ПОДТВЕРЖДЕНИЕ РЕГИСТРАЦИИ ===========*/}
        {this.state.confirmRegistration && <div className="confirmRegistration">
          <span>
            {/* value */ this.props.elementNames.EntryBar.confirmOfRegistration}
          </span>

          <div className="confirmRegistration-user-data">
            {/* Имя */}
            <div className="confirmRegistration-string">
              <span>{this.props.elementNames.EntryBar.name}:</span>
              <div className="confirmRegistration-ellipsis"></div>
              <span>{this.state.name}</span>
            </div>

            {/* Логин */}
            <div className="confirmRegistration-string">
              <span>{this.props.elementNames.EntryBar.login}:</span>
              <div className="confirmRegistration-ellipsis"></div>
              <span>{this.state.login}</span>
            </div>

            {/* Пароль */}
            <div className="confirmRegistration-string">
              <span>{this.props.elementNames.EntryBar.password}:</span>
              <div className="confirmRegistration-ellipsis"></div>
              <span>{this.state.password}</span>
            </div>

            {/* ПИН-код */}
            <div className="confirmRegistration-string">
              <span>{this.props.elementNames.EntryBar.PINcode}:</span>
              <div className="confirmRegistration-ellipsis"></div>
              <span>{this.state.PINcode}</span>
            </div>
          </div>

          <div className="EB-buttons-container">
            <button className="EB-button"
              onClick={ () => this.setState({ confirmRegistration: false }) }>
              {/* name */ this.props.elementNames.EntryBar.buttonCancel}
            </button>

            <button className="EB-button"
              onClick={ this.registration.bind(this) }>
              {/* name */ this.props.elementNames.EntryBar.buttonContinue}
            </button>
          </div>
        </div>}

        {/*========== СООЮЩЕНИЕ ОБ УСПЕШНОЙ РЕГИСТРАЦИИ ===========*/}
        {this.state.successfulRegistration && <div className="confirmRegistration">

          <div className="confirmRegistration-user-data">
            <span>{/* value */ this.props.elementNames.EntryBar.messageAboutReg}: {this.state.login}</span>
          </div>

          <div className="EB-buttons-container">
            <button className="EB-button"
              onClick={ this.props.open_aut_bar }>
              {/* name */ this.props.elementNames.EntryBar.buttonAuthorization}
            </button>
          </div>
        </div>}

      </div>
    )
  }

}

export default EntryBarReg;