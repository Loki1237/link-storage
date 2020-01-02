import React from 'react';
import styles from './App.css';
import { Router, Route } from 'react-router-dom';
import history from './history';

import { connect } from 'react-redux';
import { setLanguage, authorization } from './actions/index';

import NavBar from './containers/NavBar';
import EntryBarAut from './containers/EntryBarAut';
import EntryBarReg from './containers/EntryBarReg';
import MyLinks from './containers/MyLinks';
import UserMenu from './containers/UserMenu';

import LanguageSwitch from './components/subcomponents/LanguageSwitch';
import Modal from './components/subcomponents/Modal';
import Message from './components/subcomponents/Message';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.showMessage = this.showMessage.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
        this.updateUserProps = this.updateUserProps.bind(this);
        this.exit = this.exit.bind(this);
        this.state = {
            
        }
    }

    componentDidMount() {
        let token = localStorage.getItem("token");
        let lang = localStorage.getItem("lang");
        if( token ) {
            fetch(`/api/users/token/${token}`)
                .then( res => res.json() )
                .then( 
                    user => {
                        if( !user.error ) {
                            this.props.authorization({ data: user });
                            history.push("/bookmarks");
                        }
                        if( user.error ) {
                            history.push("/aut");
                        }
                    } 
                )
                .catch( () => history.push("/aut") );
        } else {
            history.push("/aut");
        }
        if( lang ) {
            this.props.setLanguage({ lang });
        }
    }

    showMessage(text) {
        this.setState({ message: {
            isVisible: true,
            text,
            lifeTime: new Date().getTime() + 3000
        } })
    }

    closeMessage() {
        this.setState({ message: {
            isVisible: false,
            text: "",
            lifeTime: 0
        } })
    }

    updateUserProps() {
        let token = localStorage.getItem('token');
        fetch(`/api/users/token/${token}`)
            .then( res => res.json() )
            .then( user => {
                this.props.authorization({ data: user });
            })
    }

    exit() {
        this.props.exit();
        this.setState({ showHiddenLinks: false });
        setTimeout( () => {
            history.push('/aut');
        }, 100 )
        localStorage.removeItem("token");
    }

    render() {
        return (
            <div className={styles["body-app"]}>

                <NavBar exit={this.exit} />
                
                <Router history={history}>
                    <Route path="/aut">
                        <EntryBarAut />
                        <LanguageSwitch />
                    </Route>

                    <Route path="/reg">
                        <EntryBarReg />
                        <LanguageSwitch />
                    </Route>
            
                    <Route path="/bookmarks">
                        <MyLinks />
                    </Route>
                </Router>

                {this.props.UserMenu && <UserMenu 
                    updateUserProps={this.updateUserProps}
                    showHiddenLinks={this.state.showHiddenLinks}
                    exit={this.exit}
                />}

                {this.props.modal.DeleteUser && <Modal 
                    exit={this.exit}
                    text={this.props.elementNames.Modals.DeleteUserText}
                    primaryButton={this.props.elementNames.Modals.buttonRemove}
                    action={"deleteUser"}
                />}

                {this.props.modal.ChangePassword && <Modal 
                    updateUserProps={this.updateUserProps}
                    header={this.props.elementNames.Modals.ChangePasswordHeader}
                    firstInput={{ placeholder: this.props.elementNames.Modals.placeholderOldPassword }}
                    secondInput={{ placeholder: this.props.elementNames.Modals.placeholderNewPassword }}
                    primaryButton={this.props.elementNames.Modals.buttonSave}
                    action={"changePassword"}
                />}

                {this.props.modal.ChangePINcode && <Modal 
                    updateUserProps={this.updateUserProps}
                    header={this.props.elementNames.Modals.ChangePINcodeHeader}
                    firstInput={{ placeholder: this.props.elementNames.Modals.placeholderOldPINcode }}
                    secondInput={{ placeholder: this.props.elementNames.Modals.placeholderNewPINcode }}
                    primaryButton={this.props.elementNames.Modals.buttonSave}
                    action={"changePINcode"}
                />}

                {this.props.message.isVisible && <Message />}

            </div>
        )
    }
}

function mapStateToProps( state ) {
    return {
        UserMenu: state.UserMenu,
        modal: state.modal,
        message: state.message,
        user: state.user,
        elementNames: state.elementNames
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        authorization: ownProps => dispatch( authorization( ownProps ) ),
        setLanguage: ownProps => dispatch( setLanguage( ownProps ) ),
        exit: () => {
            dispatch({
                type: "EXIT"
            })
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( App );