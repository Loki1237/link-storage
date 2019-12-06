import React from 'react';
import { connect } from 'react-redux';
import './StyleModals.css';

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DeleteUser: false
    }
  }

  componentDidMount() {
    setTimeout( () => this.setState({ DeleteUser: true }), 50 )
  }

  deleteUser(id) {
    let user = {
      id
    }
    fetch("/api/users", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    }).then(
      result => {
        this.props.closeUserMenu();
        fetch("/api/links")
          .then( res => res.json() )
          .then( links => {
            for( let i = 0; i < links.length; i++ ) {
              if( links[i].userID === id ) {
                let link = {
                  userID: id,
                  id: links[i].id
                }
                fetch("/api/links", {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify(link)
                })
              }
            }
          })
      },
      error => alert("Error")
    )
  }
  
  render() {
    return (
      <div className="Modal-backdrop">
        <div className={`Modal-window  ${this.state.DeleteUser ? "open-Modal-window" : ""}`}>

          <span className="Modal-text">
            {/* value */ this.props.elementNames.Modals.DeleteUserText}
          </span>

          <div className="Modal-bottom-string">
            <button className="Modal-button Modal-button-cancel"
              onClick={ () => {
                this.setState({ DeleteUser: false });
                setTimeout( this.props.close_modals, 250 );
              } }>
              {/* name */ this.props.elementNames.Modals.buttonCancel}
            </button>

            <button className="Modal-button"
              onClick={ () => {
                this.deleteUser(this.props.user.id);
                this.setState({ DeleteUser: false });
                setTimeout( this.props.exit, 250 );
                setTimeout( this.props.close_modals, 250 );
              } }>
              {/* name */ this.props.elementNames.Modals.buttonRemove}
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

export default connect( mapStateToProps, mapDispatchToProps )( DeleteUser )