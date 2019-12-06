import React from 'react';
import { connect } from 'react-redux';
import './StyleModals.css';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ChangePassword: false,
      oldPassword: "",
      newPassword: ""
    }
  }

  componentDidMount() {
    setTimeout( () => this.setState({ ChangePassword: true }), 50 );
  }

  changePassword() {
    if( this.state.oldPassword && this.state.newPassword &&
        this.state.oldPassword === this.props.user.password && 
        this.state.newPassword.length >= 6 ) {
      let user = {
        id: this.props.user.id,
        password: this.state.newPassword,
        PINcode: this.props.user.PINcode
      }
  
      fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      }).then(
        result => {
          this.setState({ ChangePassword: false });
          setTimeout( () => {
            this.props.close_modals();
            this.props.updateUserProps();
          }, 250 );
          alert( "Пароль успешно сохранён" );
        },
        error => alert( "Error" )
      )
    } else if( !this.state.oldPassword || !this.state.newPassword ) {
      alert( "Заполните оба поля" )
    } else if( this.state.oldPassword !== this.props.user.password ) {
      alert( "Неверный пароль" )
    } else if( this.state.newPassword.length < 6 ) {
      alert( "Новый пароль должен содержать не менее 6 символов" )
    }
  }
   
  render() {
    return (
      <div className="Modal-backdrop">
        <div className={`Modal-window ${this.state.ChangePassword ? "open-Modal-window" : ""}`}>

          <header className="Modal-header">
            {/* value */ this.props.elementNames.Modals.ChangePasswordHeader}
          </header>

          <input type="text" 
            className="Modal-input"
            placeholder={this.props.elementNames.Modals.placeholderOldPassword}
            value={ this.state.oldPassword }
            onChange={ (e) => {
              this.setState({ 
                oldPassword: e.target.value
              })
            } }
          />

          <input type="text" 
            className="Modal-input"
            placeholder={this.props.elementNames.Modals.placeholderNewPassword}
            value={ this.state.newPassword }
            onChange={ (e) => {
              this.setState({  
                newPassword: e.target.value
              })
            } }
          />

          <div className="Modal-bottom-string">
            <button className="Modal-button Modal-button-cancel"
              onClick={ () => {
                this.setState({ ChangePassword: false });
                setTimeout( this.props.close_modals, 250 );
              } }>
              {/* name */ this.props.elementNames.Modals.buttonCancel}
            </button>

            <button className="Modal-button"
              onClick={ this.changePassword.bind(this) }>
              {/* name */ this.props.elementNames.Modals.buttonSave}
            </button>
          </div>

        </div>
      </div>
    )
  }
  
}
  
//===============================================================

function mapStateToProps( state ) {
  return {
    modal: state.modal,
    user: state.user,
    elementNames: state.elementNames
  } 
}

function mapDispatchToProps( dispatch ) {
  return {
      close_modals: function() {
          dispatch({
              type: "CLOSE_MODALS"
          })
      }
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( ChangePassword )