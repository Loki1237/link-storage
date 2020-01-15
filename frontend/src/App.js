import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import styles from './App.css';

import { connect } from 'react-redux';
import { setAppData } from './actions/index';
import { translate } from './language/index';

import NavBar from './containers/NavBar';
import EntryBarAut from './containers/EntryBarAut';
import EntryBarReg from './containers/EntryBarReg';
import MyLinks from './containers/MyLinks';
import UserMenu from './containers/UserMenu';

import LanguageSwitch from './components/subcomponents/LanguageSwitch';
import Message from './components/subcomponents/Message';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.showMessage = this.showMessage.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
        this.exit = this.exit.bind(this);
        this.state = {
            Message: {
                isVisible: false,
                closing: false,
                text: "",
                color: "",
                timer: 0
            }
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        const lang = localStorage.getItem("lang");

        if (token) {
            fetch(`/api/users/token/${token}`)
                .then(res => res.json())
                .then(user => {
                    if (!user.error) {
                        this.props.setAppData({ user });
                        history.push("/bookmarks");
                    }
                    if (user.error) {
                        history.push("/aut");
                    }
                })
                .catch(() => {
                    history.push("/aut");
                });
        } else {
            history.push("/aut");
        }

        if (lang) {
            translate(lang);
            this.props.setAppData({ lang });
        }
    }

    showMessage(data) {
        this.closeMessage();
        setTimeout(() => {
            this.setState({
                Message: {
                    isVisible: true,
                    closing: false,
                    text: data.text,
                    color: data.color,
                    timer: setTimeout(this.closeMessage, 5000)
                }
            });
        }, 100);
    }

    closeMessage() {
        clearTimeout(this.state.Message.timer);
        this.setState({ 
            Message: { 
                ...this.state.Message, 
                closing: true 
            } 
        });
        setTimeout(() => {
            this.setState({
                Message: {
                    isVisible: false,
                    closing: false,
                    text: "",
                    color: "",
                    timer: null
                }
            });
        }, 100);
    }

    exit() {
        this.props.exit();
        setTimeout(() => {
            history.push("/aut");
        }, 100);
        localStorage.removeItem("token");
    }

    render() {
        return (
            <div className={styles["body-app"]}>

                <NavBar showMessage={this.showMessage} />
                
                <Router history={history}>
                    <Route path="/aut">
                        <EntryBarAut showMessage={this.showMessage} />
                        <LanguageSwitch />
                    </Route>

                    <Route path="/reg">
                        <EntryBarReg showMessage={this.showMessage} />
                        <LanguageSwitch />
                    </Route>
            
                    <Route path="/bookmarks">
                        <MyLinks showMessage={this.showMessage}
                            exit={this.exit} 
                        />
                    </Route>
                </Router>

                {this.props.UserMenu && <UserMenu 
                    updateUserProps={this.updateUserProps}
                    exit={this.exit}
                />}

                {this.state.Message.isVisible && <Message data={this.state.Message}
                    closeMessage={this.closeMessage}
                />}

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        UserMenu: state.UserMenu,
        modal: state.modal,
        appData: state.appData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setAppData: (ownProps) => dispatch(setAppData(ownProps)),
        exit: () => {
            dispatch({
                type: "EXIT"
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
