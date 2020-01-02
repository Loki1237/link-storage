import React from 'react';
import { connect } from 'react-redux';
import { showMessage } from '../../actions/index';
import styles from './Modal.css';
import Button from './Button';

const ButtonStyle = {
    minWidth: "80px",
    height: "30px",
    fontSize: "14px",
    marginLeft: "8px"
}

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Modal: false,
            firstInput: "",
            secondInput: "",
            id: 0,
            isVisible: true
        }
    }

    componentDidMount() {
        setTimeout( () => this.setState({ Modal: true }), 50 );
        if( this.props.modal.ChangeLink ) {
            let data = this.props.linkData;
            this.setState({
                firstInput: data.name,
                secondInput: data.URL,
                id: data.id,
            })
        }
    }

    addLink() {
        if( this.state.firstInput && this.state.secondInput ) {
            let link = {
                userID: this.props.user.id,
                name: this.state.firstInput,
                URL: this.state.secondInput,
                id: null,
                isVisible: this.state.isVisible
            }
        
            fetch('/api/links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(link)
            }).then(
                done => {
                    this.props.updateList();
                    this.setState({ Modal: false });
                    setTimeout( this.props.closeModal, 250 );
                },
                error => this.props.showMessage({ text: error, color: "danger" })
            )
        } else {
            this.props.showMessage({ 
                text: this.props.elementNames.Message.emptyField, 
                color: "warning" 
            });
        } 
    }

    changeLink() {
        if( this.state.firstInput && this.state.secondInput ) {
            let link = {
                userID: this.props.user.id,
                name: this.state.firstInput,
                URL: this.state.secondInput,
                id: this.state.id,
                isVisible: this.state.isVisible
            }
      
            fetch('/api/links', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(link)
            }).then(
                done => {
                    this.props.updateList();
                    this.setState({ Modal: false });
                    setTimeout( this.props.closeModal, 250 );
                },
                error => this.props.showMessage({ text: error, color: "danger" })
            )
        } else {
            this.props.showMessage({ 
                text: this.props.elementNames.Message.emptyField, 
                color: "warning" 
            });
        } 
    }

    showHiddens() {
        if( this.state.firstInput === this.props.user.PINcode ) {
            localStorage.setItem("showHidden", "1");
            this.props.updateList();
            this.setState({ Modal: false });
            setTimeout( this.props.closeModal, 250 );
        } else if( this.state.firstInput ) {
            this.props.showMessage({ 
                text: this.props.elementNames.Message.incorrectPINcode, 
                color: "danger" 
            });
        } else {
            this.props.showMessage({ 
                text: this.props.elementNames.Message.emptyPINcode, 
                color: "warning" 
            });
        }
    }

    changePassword() {
        let oldPassword = this.state.firstInput,
            newPassword = this.state.secondInput;
        if( oldPassword && newPassword &&
                oldPassword === this.props.user.password && 
                newPassword.length >= 6 ) {
            let user = {
                id: this.props.user.id,
                password: newPassword,
                PINcode: this.props.user.PINcode
            }
      
            fetch('/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            }).then(
                done => {
                    this.setState({ Modal: false });
                    setTimeout( () => {
                        this.props.closeModal();
                        this.props.updateUserProps();
                    }, 250 );
                    this.props.showMessage({ 
                        text: this.props.elementNames.Message.newPasswordSaved, 
                        color: "succes" 
                    });
                },
                error => this.props.showMessage({ text: error, color: "danger" })
            )
        } else if( !oldPassword || !newPassword ) {
            this.props.showMessage({ 
                text: this.props.elementNames.Message.emptyField, 
                color: "warning" 
            });
        } else if( oldPassword !== this.props.user.password ) {
            this.props.showMessage({ 
                text: this.props.elementNames.Message.incorrectPassword, 
                color: "danger" 
            });
        } else if( newPassword.length < 6 ) {
            this.props.showMessage({ 
                text: this.props.elementNames.Message.veryShortPassword, 
                color: "warning" 
            });
        }
    }

    changePINcode() {
        let oldPINcode = this.state.firstInput,
            newPINcode = this.state.secondInput;
        if( oldPINcode && newPINcode &&
        oldPINcode === this.props.user.PINcode && 
        newPINcode.length === 4 ) {
            let user = {
                id: this.props.user.id,
                password: this.props.user.password,
                PINcode: newPINcode
            }
      
            fetch('/api/users', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            }).then(
                done => {
                    this.setState({ ChangePINcode: false });
                    setTimeout( this.props.closeModal, 250 );
                    this.props.updateUserProps()
                    this.props.showMessage({ 
                        text: this.props.elementNames.Message.newPINcodeSaved, 
                        color: "succes" 
                    });
                },
                error => this.props.showMessage({ text: error, color: "danger" })
            )
        } else if( !oldPINcode || !newPINcode ) {
            this.props.showMessage({ 
                text: this.props.elementNames.Message.emptyField, 
                color: "warning" 
            });
        } else if( oldPINcode !== this.props.user.PINcode ) {
            this.props.showMessage({ 
                text: this.props.elementNames.Message.incorrectPINcode, 
                color: "danger" 
            });
        } else if( newPINcode.length < 4 ) {
            this.props.showMessage({ 
                text: this.props.elementNames.Message.incorrectNewPINcode, 
                color: "warning" 
            });
        }
    }

    deleteUser(id) {
        fetch("/api/users", {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            id
          })
        }).then(
          res => {
            fetch(`/api/links/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              }
            })
            this.setState({ Modal: false });
            setTimeout( () => {
                this.props.closeModal();
                this.props.exit();
                this.props.showMessage({ 
                    text: this.props.elementNames.Message.userIsDeleted, 
                    color: "succes" 
                })
            }, 250 );
          },
          error => this.props.showMessage({ text: error, color: "danger" })
        )
    }

    render() {
        return (
            <div className={`${styles.backdrop} ${this.state.Modal ? styles["open-backdrop"] : ""}`}>
                <div className={`${styles.Modal} ${this.state.Modal ? styles["open-Modal"] : ""}`}>
                    {this.props.header && <header className={styles.header}>
                        {this.props.header}
                    </header>}

                    {this.props.text && <span className={styles.text}>
                        {this.props.text}
                    </span>}

                    {this.props.firstInput && <input type="text" 
                        className={styles.input}
                        autoFocus
                        placeholder={this.props.firstInput.placeholder}
                        value={ this.state.firstInput }
                        onChange={ (e) => {
                            this.setState({ 
                                firstInput: e.target.value
                            })
                        } }
                    />}

                    {this.props.secondInput && <input type="text" 
                        className={styles.input}
                        placeholder={this.props.secondInput.placeholder}
                        value={ this.state.secondInput }
                        onChange={ (e) => {
                            this.setState({ 
                                secondInput: e.target.value
                            })
                        } }
                    />}

                    <div className={styles.bottomElementsRow}>
                        {this.props.checkbox && <label className={styles.label}>
                            <input type="checkbox" 
                                className={styles.checkbox}
                                onChange={ (e) => {
                                    this.setState({
                                        isVisible: e.target.checked ? false : true 
                                    })
                                } } />
                            {/* name */ this.props.elementNames.Modals.labelHiddenBookmark}
                        </label>}

                        <Button color="secondary" style={ButtonStyle}
                            onClick={() => {
                                this.setState({ Modal: false });
                                setTimeout( this.props.closeModal, 250 );
                            }}>
                            {/* name */ this.props.elementNames.Modals.buttonCancel}
                        </Button>
                
                        <Button color="primary" style={ButtonStyle}
                            onClick={() => {
                                switch( this.props.action ) {
                                    case "addLink":
                                        this.addLink();
                                        break;
                                    case "changeLink":
                                        this.changeLink();
                                        break;
                                    case "showHiddens":
                                        this.showHiddens();
                                        break;
                                    case "changePassword":
                                        this.changePassword();
                                        break;
                                    case "changePINcode":
                                        this.changePINcode();
                                        break;
                                    case "deleteUser":
                                        this.deleteUser( this.props.user.id );
                                        break;
                                }
                            }}>
                            {this.props.primaryButton}
                        </Button>
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
        closeModal: function() {
            dispatch({
                type: "CLOSE_MODAL"
            })
        },
        showMessage: ownProps => dispatch( showMessage( ownProps ) )
    }
}
  
export default connect( mapStateToProps, mapDispatchToProps )( Modal )