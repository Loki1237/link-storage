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

class EntryBarReg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            name: "",
            login: "",
            password: "",
            PIN: "",
            highlighting: {
                name: false,
                login: false,
                password: false,
                PIN: false
            },
            regError: {
                incorrectName: false,
                incorrectLogin: false,
                incorrectPassword: false,
                shortPassword: false,
                incorrectPIN: false
            },
            confirmRegistration: false
        };
    }

    highlighting(field) {
        this.setState({ highlighting: { [field]: true } });
        setTimeout(() => {
            this.setState({ highlighting: false });
        }, 400);
    }

    checkOfName() {
        for (let symbol of this.state.name) {
            if (!/[a-z A-Z а-я А-Я]/.test(symbol)) {
                return false;
            }
        }

        return true;
    }

    checkOfLogin() {
        for (let symbol of this.state.login) {
            if (!/[a-z A-Z 0-9 _]/.test(symbol)) {
                return false;
            }
        }

        if (isFinite(this.state.login[0])) {
            return false;
        }

        return true;
    }

    checkOfPassword() {
        for (let symbol of this.state.password) {
            if (!/[a-z A-Z 0-9]/.test(symbol)) {
                return false;
            }
        }

        return true;
    }

    confirmRegistration = () => {
        // Подсветка пустого текстового поля
        if (!this.state.name) {
            this.highlighting("name");
        }

        if (!this.state.login && this.state.name) {
            this.highlighting("login");
        }

        if (!this.state.password && this.state.name && this.state.login) {
            this.highlighting("password");
        }

        if (!this.state.PIN && this.state.password && this.state.name && this.state.login) {
            this.highlighting("PIN");
        }

        // Ошибка: некорректное имя
        if (
            this.state.name && this.state.login && 
            this.state.password && this.state.PIN &&
            !this.checkOfName() &&
            !this.state.regError.incorrectName
        ) {
            this.props.showMessage({ 
                text: language.EntryBar.regErrorIncorrectName, 
                color: "danger" 
            });
        }

        // Ошибка: некорректный логин
        if ( 
            this.state.name && this.state.login && 
            this.state.password && this.state.PIN &&
            this.checkOfName() && !this.checkOfLogin() &&
            !this.state.regError.incorrectLogin
        ) {
            this.props.showMessage({ 
                text: language.EntryBar.regErrorIncorrectLogin, 
                color: "danger" 
            });
        }

        // Ошибка: некорректный пароль
        if ( 
            this.state.name && this.state.login && 
            this.state.password && this.state.PIN &&
            this.checkOfName() && this.checkOfLogin() && !this.checkOfPassword() &&
            !this.state.regError.incorrectPassword 
        ) {
            this.props.showMessage({ 
                text: language.EntryBar.regErrorIncorrectPassword, 
                color: "danger" 
            });
        }

        // Ошибка: слишком короткий пароль
        if ( 
            this.state.name && this.state.login && 
            this.state.password && this.state.PIN &&
            this.checkOfName() && this.checkOfLogin() && this.checkOfPassword() &&
            this.state.password.length < 8 && !this.state.regError.shortPassword 
        ) {
            this.props.showMessage({ 
                text: language.EntryBar.regErrorVeryShortPassword, 
                color: "danger" 
            });
        }

        // Ошибка: некорректный PIN-код
        if (
            this.state.name && this.state.login && 
            this.state.password && this.state.PIN &&
            this.checkOfName() && this.checkOfLogin() && this.checkOfPassword() &&
            this.state.password.length >= 8 && !this.state.regError.PIN && 
            (!isFinite(this.state.PIN) || this.state.PIN.length < 4) 
        ) {
            this.props.showMessage({ 
                text: language.EntryBar.regErrorIncorrectPINcode, 
                color: "danger" 
            });
        }

        // Если все условия соблюдены - зарегестрировать
        if (
            this.state.name && this.state.login && 
            this.state.password && this.state.PIN &&
            this.checkOfName() && this.checkOfLogin() && this.checkOfPassword() &&
            this.state.password.length >= 8 && this.state.PIN.length === 4 && 
            isFinite(this.state.PIN) 
        ) {
            fetch(`api/users/find/${this.state.login}`)
                .then(res => res.json(res))
                .then(user => {
                    if (user) {
                        this.props.showMessage({ 
                            text: language.Message.errorOfNotUniqueLogin,
                            color: "danger" 
                        });
                    } 

                    if (!user) {
                        this.setState({ confirmRegistration: true });
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

    registration = () => {
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: this.state.name,
                login: this.state.login,
                password: this.state.password,
                PIN: this.state.PIN
            })
        }).then(() => {
            this.setState({ confirmRegistration: false });
            this.props.showMessage({ 
                text: `${language.Message.messageAboutReg}: ${this.state.login}`, 
                color: "success" 
            });
            history.push('/aut');
        }).catch(error => {
            this.props.showMessage({ text: error, color: "danger" });
        });
    }

    render() {
        return (
            <div className={styles.EntryBar}>
                <header className={styles.header}>
                    {/* header */ language.EntryBar.RegBarHeader}
                </header>

                {/*========== И М Я ===========*/}
                <InputField type="text"
                    name={language.EntryBar.name}
                    highlighting={this.state.highlighting.name}
                    autoFocus
                    value={this.state.name}
                    onChange={(e) => {
                        this.setState({ name: e.target.value });
                    }} />
              
                {/*========== Л О Г И Н  ===========*/}
                <InputField type="text"
                    name={language.EntryBar.login}
                    highlighting={this.state.highlighting.login}
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
              
                {/*========== P I N - C O D E  ===========*/}
                <InputField type="text"
                    name={language.EntryBar.PINcode}
                    highlighting={this.state.highlighting.PIN}
                    maxLength="4"
                    tip={language.EntryBar.titlePINcode}
                    value={this.state.PIN}
                    onChange={(e) => {
                        this.setState({ PIN: e.target.value });
                    }} />
              
                {/*========== К Н О П К И ===========*/}
                <div className={styles["buttons-container"]}>
                    <Button color="primary" style={ButtonStyle}
                        onClick={() => {
                            history.push("/aut");
                        }}>
                        {/* name */ language.EntryBar.buttonCancel}
                    </Button>

                    <Button color="primary" style={ButtonStyle}
                        onClick={this.confirmRegistration}>
                        {/* name */ language.EntryBar.buttonContinue}
                    </Button>
                </div>
              
                {/*========== ПОДТВЕРЖДЕНИЕ РЕГИСТРАЦИИ ===========*/}
                {this.state.confirmRegistration && <div className={styles.confirmRegistration}>
                    <span>
                        {/* value */ language.EntryBar.confirmOfRegistration}
                    </span>

                    <div className={styles["confirmRegistration-user-data"]}>
                        {/* Имя */}
                        <div className={styles["confirmRegistration-string"]}>
                            <span>{language.EntryBar.name}:</span>
                            <div className={styles["confirmRegistration-ellipsis"]}></div>
                            <span>{this.state.name}</span>
                        </div>

                        {/* Логин */}
                        <div className={styles["confirmRegistration-string"]}>
                            <span>{language.EntryBar.login}:</span>
                            <div className={styles["confirmRegistration-ellipsis"]}></div>
                            <span>{this.state.login}</span>
                        </div>

                        {/* Пароль */}
                        <div className={styles["confirmRegistration-string"]}>
                            <span>{language.EntryBar.password}:</span>
                            <div className={styles["confirmRegistration-ellipsis"]}></div>
                            <span>{this.state.password}</span>
                        </div>

                        {/* ПИН-код */}
                        <div className={styles["confirmRegistration-string"]}>
                            <span>{language.EntryBar.PINcode}:</span>
                            <div className={styles["confirmRegistration-ellipsis"]}></div>
                            <span>{this.state.PIN}</span>
                        </div>
                    </div>

                    <div className={styles["buttons-container"]}>
                        <Button color="cancel" style={ButtonStyle}
                            onClick={() => {
                                this.setState({ confirmRegistration: false });
                            }}>
                            {/* name */ language.EntryBar.buttonCancel}
                        </Button>

                        <Button color="primary" style={ButtonStyle}
                            onClick={this.registration}>
                            {/* name */ language.EntryBar.buttonContinue}
                        </Button>
                    </div>
                </div>}

            </div>
        );
    }
}

export default EntryBarReg;
