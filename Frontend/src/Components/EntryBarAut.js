import React from 'react';
import './EntryBar.css';

class EntryBarAut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      login: "",
      password: "",
      highlighting: {
        login: false,
        password: false,
      },
      entryError: {
        input: false,
        server: false,
      }
    }
  }

  highlighting(field) {
    this.setState({ highlighting: { [field]: true } });
    setTimeout( () => {
      this.setState({ highlighting: false })
    }, 400 )
  }

  entry() {
    // Подсветка пустого текстового поля
    if(!this.state.login) this.highlighting( "login" );
    if(!this.state.password && this.state.login) this.highlighting( "password" )

    if( this.state.login && this.state.password ) {
      fetch(`api/users/${this.state.login}`)
        .then( res => res.json() )
        .then( 
          user => {
            if( user && this.state.password === user.password  ) {
              document.cookie = "isAuthorized=true; max-age=31536000";
              document.cookie = `login=${user.login}; max-age=31536000`;
              document.cookie = `password=${user.password}; max-age=31536000`;
              this.props.authorization({ data: user });
              this.props.open_my_links();
            } else {
              this.setState({ entryError: { input: true } });
            }
          },
          error => this.setState({ entryError: { server: true } })
        )
    }
  }

  render() {
    return (
      <div className="EntryBar">
        <header className="EB-header">
          {/* header */ this.props.elementNames.EntryBar.AutBarHeader}
        </header>
        
        {/* Неверный логин или пароль */}
        {this.state.entryError.input && <div className="EB-error">
          {/* value */ this.props.elementNames.EntryBar.errorOfLogIn}
          <button className="EB-error-button-close"
            onClick={ () => {
              this.setState({ entryError: false });
            } }>
          </button>
        </div>}
        
        {/* Ошибка: сервер временно недоступен */}
        {this.state.entryError.server && <div className="EB-error">
          {/* value */ this.props.elementNames.EntryBar.errorOfServer}
          <button className="EB-error-button-close"
            onClick={ () => {
              this.setState({ entryError: false });
            } }>
          </button>
        </div>}
        
        {/*========== Л О Г И Н ===========*/}
        <div className="EB-input-field">
          <input type="text"
            autoComplete="off"
            autoFocus
            className={`EB-input 
              ${this.state.highlighting.login ? "EB-alert" : ""}`}
            value={this.state.login}
            onChange={ (e) => {
              this.setState( {login: e.target.value} )
            } } />
          <span className="EB-input-field-name">
            {/* name */ this.props.elementNames.EntryBar.login}
          </span>
        </div>
        
        {/*========== П А Р О Л Ь ===========*/}
        <div className="EB-input-field">
          <input type={this.state.showPassword ? "text" : "password"} 
            autoComplete="off"
            className={`EB-input 
              ${this.state.highlighting.password ? "EB-alert" : ""}`}
            value={this.state.password}
            onChange={ (e) => {
              this.setState( {password: e.target.value} )
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
        </div>
        
        {/*========== К Н О П К И ===========*/}
        <div className="EB-buttons-container">
          <button className="EB-button"
            onClick={ this.props.open_reg_bar }>
            {/* name */ this.props.elementNames.EntryBar.buttonRegistration}
          </button>

          <button className="EB-button"
            onClick={ this.entry.bind(this) }>
            {/* name */ this.props.elementNames.EntryBar.buttonAuthorization}
          </button>
        </div>
      </div>
    )
  }

}

export default EntryBarAut;
