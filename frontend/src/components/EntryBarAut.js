import React from 'react';
import styles from './EntryBar.css';
import { language } from '../language/index';
import Button from './subcomponents/Button';
import InputField from './subcomponents/InputField';
import history from '../history';

const ButtonStyle = {
    width: "120px",
    height: "30px",
    fontSize: "14px"
};

class EntryBarAut extends React.Component {
    constructor(props) {
        super(props);
        this.entry = this.entry.bind(this);
        this.state = {
            showPassword: false,
            login: "",
            password: "",
            highlighting: {
                login: false,
                password: false
            }
        };
    }

    highlighting(field) {
        this.setState({ highlighting: { [field]: true } });
        setTimeout(() => {
            this.setState({ highlighting: false });
        }, 400);
    }

    entry() {
        // Подсветка пустого текстового поля
        if (!this.state.login) {
            this.highlighting("login");
        }

        if (!this.state.password && this.state.login) {
            this.highlighting("password");
        }

        if (this.state.login && this.state.password) {
            fetch(`api/users/login/${this.state.login}/${this.state.password}`)
                .then(res => res.json())
                .then(user => {
                    if (!user.error) {
                        localStorage.setItem('token', `${user.token}`);
                        this.props.setAppData({ user });
                        history.push("/bookmarks");
                    } else {
                        this.props.showMessage({ 
                            text: language.Message.errorOfLogIn,
                            color: "danger" 
                        });
                    }
                })
                .catch(() => {
                    this.props.showMessage({ 
                        text: language.Message.errorOfServer,
                        color: "danger" 
                    });
                });
        }
    }

    render() {
        return (
            <div className={styles.EntryBar}>
                <header className={styles.header}>
                    {/* header */ language.EntryBar.AutBarHeader}
                </header>
              
                {/*========== Л О Г И Н ===========*/}
                <InputField type="text"
                    name={language.EntryBar.login}
                    highlighting={this.state.highlighting.login}
                    autoFocus
                    value={this.state.login}
                    onChange={(e) => {
                        this.setState({ login: e.target.value });
                    }} />
              
                {/*========== П А Р О Л Ь ===========*/}
                <InputField type="password"
                    name={language.EntryBar.password}
                    highlighting={this.state.highlighting.password}
                    maxLength="12"
                    value={this.state.password}
                    onChange={(e) => {
                        this.setState({ password: e.target.value });
                    }} />
              
                {/*========== К Н О П К И ===========*/}
                <div className={styles["buttons-container"]}>
                    <Button color="primary" style={ButtonStyle}
                        onClick={() => history.push("/reg")} >
                        {/* name */ language.EntryBar.buttonRegistration}
                    </Button>

                    <button
                        onClick={() => {
                            this.setState({ login: "joni1237", password: "12345678" });
                        }}>
                        sign in
                    </button>

                    <Button color="primary" style={ButtonStyle}
                        onClick={this.entry}>
                        {/* name */ language.EntryBar.buttonAuthorization}
                    </Button>
                </div>
            </div>
        );
    }
}

export default EntryBarAut;
