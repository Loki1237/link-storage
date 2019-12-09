import React from 'react';
import { connect } from 'react-redux';
import './StyleModals.css';

class ShowHiddens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowHiddens: false,
      PINcode: ""
    }
  }

  componentDidMount() {
    setTimeout( () => this.setState({ ShowHiddens: true }), 50 )
  }

  showHiddens() {
    if( this.state.PINcode === this.props.user.PINcode ) {
      this.props.showHL();
      this.setState({ ShowHiddens: false });
      setTimeout( this.props.close_modals, 250 );
    } else if( this.state.PINcode ) {
      alert( "Неверный PIN-код" )
    } else {
      alert( "Введите PIN-код" )
    }
  }
  
  render() {
    return (
      <div className={`Modal-backdrop  ${this.state.ShowHiddens ? "open-Modal-backdrop" : ""}`}>
        <div className={`Modal-window  ${this.state.ShowHiddens ? "open-Modal-window" : ""}`}>

          <span className="Modal-text">
            {/* value */ this.props.elementNames.Modals.ShowHiddenText}
          </span>

          <input type="text" 
            className="Modal-input"
            maxLength="4"
            autoFocus
            value={ this.state.PINcode }
            onChange={ (e) => {
              this.setState({  
                PINcode: e.target.value
              })
            } }
          />

          <div className="Modal-bottom-string">
            <button className="Modal-button Modal-button-cancel"
              onClick={ () => {
                this.setState({ ShowHiddens: false });
                setTimeout( this.props.close_modals, 250 );
              } }>
              {/* name */ this.props.elementNames.Modals.buttonCancel}
            </button>

            <button className="Modal-button"
              onClick={ this.showHiddens.bind(this) }>
              {/* name */ this.props.elementNames.Modals.buttonOk}
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

export default connect( mapStateToProps, mapDispatchToProps )( ShowHiddens )