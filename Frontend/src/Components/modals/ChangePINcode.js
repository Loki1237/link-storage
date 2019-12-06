import React from 'react';
import { connect } from 'react-redux';
import './StyleModals.css';

class ChangePINcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ChangePINcode: false,
      oldPINcode: "",
      newPINcode: ""
    }
  }

  componentDidMount() {
    setTimeout( () => this.setState({ ChangePINcode: true }), 50 );
  }

  changePINcode() {
    if( this.state.oldPINcode && this.state.newPINcode &&
        this.state.oldPINcode === this.props.user.PINcode && 
        this.state.newPINcode.length === 4 ) {
      let user = {
        id: this.props.user.id,
        password: this.props.user.password,
        PINcode: this.state.newPINcode
      }
  
      fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      }).then(
        result => {
          this.setState({ ChangePINcode: false });
          setTimeout( this.props.close_modals, 250 );
          this.props.updateUserProps()
          alert( "Новый PIN-код успешно сохранён" )
        },
        error => alert( "Error" )
      )
    } else if( !this.state.oldPINcode || !this.state.newPINcode ) {
      alert( "Заполните оба поля" )
    } else if( this.state.oldPINcode !== this.props.user.PINcode ) {
      alert( "Неверный PIN-код" )
    } else if( this.state.newPINcode.length < 4 ) {
      alert( "Новый PIN-код должен состоять из 4 цифр" )
    }

  }
   
  render() {
    return (
      <div className="Modal-backdrop">
        <div className={`Modal-window  ${this.state.ChangePINcode ? "open-Modal-window" : ""}`}>

          <header className="Modal-header">
            {/* value */ this.props.elementNames.Modals.ChangePINcodeHeader}
          </header>

          <input type="text" 
            className="Modal-input"
            placeholder={this.props.elementNames.Modals.placeholderOldPINcode}
            maxLength="4"
            value={ this.state.oldPINcode }
            onChange={ (e) => {
              this.setState({ 
                oldPINcode: e.target.value
              })
            } }
          />

          <input type="text" 
            className="Modal-input"
            placeholder={this.props.elementNames.Modals.placeholderNewPINcode}
            maxLength="4"
            value={ this.state.newPINcode }
            onChange={ (e) => {
              this.setState({  
                newPINcode: e.target.value
              })
            } }
          />

          <div className="Modal-bottom-string">
            <button className="Modal-button Modal-button-cancel"
              onClick={ () => {
                this.setState({ ChangePINcode: false });
                setTimeout( this.props.close_modals, 250 );
              } }>
              {/* name */ this.props.elementNames.Modals.buttonCancel}
            </button>

            <button className="Modal-button"
              onClick={ this.changePINcode.bind(this) }>
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

export default connect( mapStateToProps, mapDispatchToProps )( ChangePINcode )