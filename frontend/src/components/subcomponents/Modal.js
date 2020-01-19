import React from 'react';
import { connect } from 'react-redux';
import { SetAppData } from '../../actions/index';
import { language } from '../../language/index';
import styles from './Modal.css';
import Button from './Button';
import InputField from './InputField';

const ButtonStyle = {
    minWidth: "80px",
    height: "30px",
    fontSize: "14px",
    marginLeft: "8px"
};

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Modal: false,
            firstInput: "",
            secondInput: "",
            id: 0,
            isVisible: true
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ Modal: true }), 50);

        if (this.props.modal.ChangeLink) {
            const data = this.props.linkData;
            this.setState({
                firstInput: data.name,
                secondInput: data.URL,
                id: data.id,
                isVisible: data.isVisible
            });
        }
    }

    closeModal() {
        this.setState({ Modal: false });
        setTimeout(this.props.closeModal, 250);
    }

    addLink() {
        if (this.state.firstInput && this.state.secondInput) {
            fetch('/api/links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    name: this.state.firstInput,
                    URL: this.state.secondInput,
                    userID: this.props.appData.user.id,
                    isVisible: this.state.isVisible
                })
            }).then(() => {
                this.props.updateList();
                this.closeModal();
            }).catch(error => {
                this.props.showMessage({ text: error, color: "danger" });
            });
        } else {
            this.props.showMessage({ 
                text: language.Message.emptyField, 
                color: "warning" 
            });
        }
    }

    changeLink() {
        if (this.state.firstInput && this.state.secondInput) {
            fetch(`/api/links/${this.props.linkData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    name: this.state.firstInput,
                    URL: this.state.secondInput,
                    isVisible: this.state.isVisible
                })
            }).then(() => {
                this.props.updateList();
                this.closeModal();
            }).catch(error => {
                this.props.showMessage({ text: error, color: "danger" });
            });
        } else {
            this.props.showMessage({ 
                text: language.Message.emptyField, 
                color: "warning" 
            });
        }
    }

    async showHiddenLinks() {
        const PIN = this.state.firstInput;

        if (PIN) {
            const req = await fetch(`/api/users/${this.props.appData.user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    PIN,
                    show: "change"
                })
            });
            const res = await req.json();

            if (res.success) {
                this.props.updateList();
                this.updateUserData();
                this.closeModal();
            } else if (res.error) {
                this.props.showMessage({ 
                    text: language.Message.incorrectPINcode, 
                    color: "danger" 
                });
            }
        } else {
            this.props.showMessage({ 
                text: language.Message.emptyPINcode, 
                color: "warning" 
            });
        }
    }

    async changeUserData(dataType) {
        const password = this.state.firstInput;
        const newData = this.state.secondInput;

        if (password && newData) {
            let correctNewData;

            if (dataType === "password") {
                correctNewData = newData.length >= 8 ? "yes" : "no, very short password";
            } else if (dataType === "PIN") {
                correctNewData = newData.length === 4 && isFinite(newData) ? "yes" : "no, incorrect PIN";
            }

            if (correctNewData === "yes") {
                const req = await fetch(`/api/users/${this.props.appData.user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        password,
                        newPassword: dataType === "password" ? newData : null,
                        newPIN: dataType === "PIN" ? newData : null
                    })
                });
                const res = await req.json();

                if (res.success) {
                    this.closeModal();
                    this.props.showMessage({ 
                        text: language.Message.newUserDataSaved, 
                        color: "success" 
                    });
                } else if (res.error) {
                    this.props.showMessage({ 
                        text: language.Message.incorrectPassword, 
                        color: "danger" 
                    });
                }
            } else if (correctNewData === "no, very short password") {
                this.props.showMessage({ 
                    text: language.Message.veryShortPassword, 
                    color: "warning" 
                });
            } else if (correctNewData === "no, incorrect PIN") {
                this.props.showMessage({ 
                    text: language.Message.incorrectNewPINcode, 
                    color: "warning" 
                });
            }
        } else {
            this.props.showMessage({ 
                text: language.Message.emptyField, 
                color: "warning" 
            });
        }
    }

    deleteUser(id) {
        fetch(`/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(() => {
            fetch(`/api/links/all/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            });
            this.closeModal();
            setTimeout(() => {
                this.props.exit();
                this.props.showMessage({ 
                    text: language.Message.userIsDeleted, 
                    color: "success" 
                });
            }, 250);
        }).catch(error => {
            this.props.showMessage({ text: error, color: "danger" });
        });
    }

    updateUserData = () => {
        const token = localStorage.getItem('token');
        fetch(`/api/users/token/${token}`)
            .then(res => res.json())
            .then(user => {
                this.props.setAppData({ user });
            });
    }

    action = () => {
        switch (this.props.action) {
            case "addLink":
                this.addLink();
                break;

            case "changeLink":
                this.changeLink();
                break;
                
            case "showHiddenLinks":
                this.showHiddenLinks();
                break;

            case "changePassword":
                this.changeUserData("password");
                break;

            case "changePIN":
                this.changeUserData("PIN");
                break;

            case "deleteUser":
                this.deleteUser(this.props.appData.user.id);
                break;
        }
    }

    render() {
        return (
            <div className={`${styles.backdrop} ${this.state.Modal ? styles["open-backdrop"] : ""}`}>
                <div className={`${styles.Modal} ${this.state.Modal ? styles["open-Modal"] : ""}`}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            this.action();
                        }
                    }}>

                    {this.props.header && <header className={styles.header}>
                        {this.props.header}
                    </header>}

                    {this.props.text && <span className={styles.text}>
                        {this.props.text}
                    </span>}

                    {this.props.inputFields.length >= 1 && <InputField
                        style={{
                            width: "90%"
                        }}
                        name={this.props.inputFields[0].name}
                        type={this.props.inputFields[0].type}
                        maxLength={this.props.inputFields[0].maxLength}
                        autoFocus
                        value={this.state.firstInput}
                        onChange={(e) => {
                            this.setState({ firstInput: e.target.value });
                        }} 
                    />}

                    {this.props.inputFields.length >= 2 && <InputField
                        style={{
                            width: "90%"
                        }}
                        name={this.props.inputFields[1].name}
                        type={this.props.inputFields[1].type}
                        maxLength={this.props.inputFields[1].maxLength}
                        value={this.state.secondInput}
                        onChange={(e) => {
                            this.setState({ secondInput: e.target.value });
                        }} 
                    />}

                    <div className={styles.bottomElementsRow}>
                        {this.props.checkbox && <label className={styles.label}>
                            <input type="checkbox" 
                                className={styles.checkbox}
                                checked={!this.state.isVisible}
                                onChange={(e) => {
                                    this.setState({
                                        isVisible: !e.target.checked
                                    });
                                }} />
                            {/* name */ language.Modals.labelSecretBookmark}
                        </label>}

                        <Button color="cancel" style={ButtonStyle}
                            onClick={() => {
                                this.setState({ Modal: false });
                                setTimeout(this.props.closeModal, 250);
                            }}>
                            {/* name */ language.Modals.buttonCancel}
                        </Button>
                
                        <Button color="primary" style={ButtonStyle}
                            onClick={this.action}>
                            {this.props.actionButton}
                        </Button>
                    </div>
                </div>
                
            </div>
        );
    }
}

//===============================================================

function mapStateToProps(state) {
    return {
        modal: state.modal,
        appData: state.appData
    };
}
  
function mapDispatchToProps(dispatch) {
    return {
        setAppData: ownProps => dispatch(SetAppData(ownProps)),
        closeModal: function() {
            dispatch({
                type: "CLOSE_MODAL"
            });
        }
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
