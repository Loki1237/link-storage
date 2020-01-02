import React from 'react';
import styles from './EntryBar.css';
import Button from './subcomponents/Button';
import history from '../history';

const ButtonStyle = {
    width: "120px",
    height: "30px",
    fontSize: "14px"
}

class EntryBarReg extends React.Component {
    constructor(props) {
        super(props);
        this.confirmRegistration = this.confirmRegistration.bind(this);
        this.registration = this.registration.bind(this);
        this.state = {
            showPassword: false,
            name: "",
            login: "",
            password: "",
            PINcode: "",
            highlighting: {
                name: false,
                login: false,
                password: false,
                PINcode: false
            },
            regError: {
                incorrectName: false,
                incorrectLogin: false,
                incorrectPassword: false,
                shortPassword: false,
                incorrectPINcode: false,
            },
            confirmRegistration: false
        }
    }

    highlighting( field ) {
        this.setState({ highlighting: { [field]: true } });
        setTimeout( () => {
            this.setState({ highlighting: false });
        }, 400 )
    }

    checkOfName() {
        for( let symbol of this.state.name ) {
            if( !/[a-z A-Z а-я А-Я]/.test(symbol) ) {
                return false;
            }
        }
        return true;
    }

    checkOfLogin() {
        for( let symbol of this.state.login ) {
            if( !/[a-z A-Z 0-9 _]/.test(symbol) ) {
                return false;
            }
        }
        if( isFinite( this.state.login[0] ) ) return false;
        return true;
    }

    checkOfPassword() {
        for( let symbol of this.state.password ) {
            if( !/[a-z A-Z 0-9]/.test( symbol ) ) {
                return false;
            }
        }
        return true;
    }

    confirmRegistration() {
        // Подсветка пустого текстового поля
        if( !this.state.name ) {
            this.highlighting( "name" );
        }
        if( !this.state.login && this.state.name ) {
            this.highlighting( "login" );
        }
        if( !this.state.password && this.state.name && this.state.login ) {
            this.highlighting( "password" );
        }
        if( !this.state.PINcode && this.state.password && this.state.name && this.state.login ) {
            this.highlighting( "PINcode" );
        }

        // Ошибка: некорректное имя
        if( this.state.name && this.state.login && this.state.password && this.state.PINcode &&
        !this.checkOfName() ) {
            this.setState({ regError: { incorrectName: true } });
            setTimeout( () => { this.setState({ regError: false }) }, 2000 );
        }

        // Ошибка: некорректный логин
        if( this.state.name && this.state.login && this.state.password && this.state.PINcode &&
        this.checkOfName() && !this.checkOfLogin() ) {
            this.setState({ regError: { incorrectLogin: true } });
            setTimeout( () => { this.setState({ regError: false }) }, 2000 );
        }

        // Ошибка: некорректный пароль
        if( this.state.name && this.state.login && this.state.password && this.state.PINcode &&
        this.checkOfName() && this.checkOfLogin() && !this.checkOfPassword() &&
        !this.state.regError.shortPassword ) {
            this.setState({ regError: { incorrectPassword: true } });
            setTimeout( () => { this.setState({ regError: false }) }, 2000 );
        }

        // Ошибка: слишком короткий пароль
        if( this.state.name && this.state.login && this.state.password && this.state.PINcode &&
        this.checkOfName() && this.checkOfLogin() && this.checkOfPassword() &&
        this.state.password.length < 6 && !this.state.regError.shortPassword ) {
            this.setState({ regError: { shortPassword: true } });
            setTimeout( () => { this.setState({ regError: false }) }, 2000 );
        }

        // Ошибка: некорректный PIN-код
        if( this.state.name && this.state.login && this.state.password && this.state.PINcode &&
        this.checkOfName() && this.checkOfLogin() && this.checkOfPassword() &&
        this.state.password.length >= 6 && !this.state.regError.incorrectPINcode && 
        (!isFinite(this.state.PINcode) || this.state.PINcode.length < 4) ) {
            this.setState({ regError: { incorrectPINcode: true } });
            setTimeout( () => { this.setState({ regError: false }) }, 2000 );
        }

        // Если все условия соблюдены - зарегестрировать
        if( this.state.name && this.state.login && this.state.password && this.state.PINcode &&
        this.checkOfName() && this.checkOfLogin() && this.checkOfPassword() &&
        this.state.password.length >= 6 && this.state.PINcode.length === 4 && isFinite(this.state.PINcode) ) {

            fetch(`api/users/${this.state.login}`)
                .then( res => res.json( res ))
                .then( user => {
                    if( !user.error ) {
                        this.props.showMessage({ 
                            text: this.props.elementNames.Message.errorOfNotUniqueLogin,
                            color: "danger" 
                        })
                    } 
                    if( user.error ) {
                        this.setState({ confirmRegistration: true })
                    }
                })
                .catch( () => {
                    this.props.showMessage({ 
                        text: this.props.elementNames.Message.errorOfServer,
                        color: "danger" 
                    })
                } )
        }
    }

    registration() {
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: this.state.name,
                login: this.state.login,
                password: this.state.password,
                PINcode: this.state.PINcode,
            })
        })
            .then( () => {
                this.setState({ confirmRegistration: false });
                this.props.showMessage({ 
                    text: `${this.props.elementNames.Message.messageAboutReg}: ${this.state.login}`, 
                    color: "succes" 
                });
                history.push('/aut');
            })
            .catch( () => {
                error => this.props.showMessage({ text: error, color: "danger" });
            })
    }

    render() {
        return (
            <div className={styles.EntryBar}>
                <header className={styles.header}>
                    {/* header */ this.props.elementNames.EntryBar.RegBarHeader}
                </header>

                {/*========== И М Я ===========*/}
                <div className={styles["input-field"]}>
                    <input type="text"  
                        autoComplete="off"
                        autoFocus
                        className={`${styles.input}
                            ${this.state.highlighting.name ? styles.highlighting : ""}`}
                        value={this.state.name}
                        onChange={(e) => {
                            this.setState({ name: e.target.value });
                        }} />
                    <span className={styles["input-field-name"]}>
                        {/* name */ this.props.elementNames.EntryBar.name}
                    </span>

                    {this.state.regError.incorrectName && <div className={styles.regError}>
                        {/* value */ this.props.elementNames.EntryBar.regErrorIncorrectName}
                    </div>}
                </div>
              
                {/*========== Л О Г И Н  ===========*/}
                <div className={styles["input-field"]}>
                    <input type="text" 
                        autoComplete="off"
                        className={`${styles.input}
                            ${this.state.highlighting.login ? styles.highlighting : ""}`}
                        value={this.state.login}
                        onChange={(e) => {
                            this.setState({ login: e.target.value });
                        }} />
                    <span className={styles["input-field-name"]}>
                        {/* name */ this.props.elementNames.EntryBar.login}
                    </span>

                    {this.state.regError.incorrectLogin && <div className={styles.regError}>
                        {/* value */ this.props.elementNames.EntryBar.regErrorIncorrectLogin}
                    </div>}
                </div>
              
                {/*========== П А Р О Л Ь ===========*/}
                <div className={styles["input-field"]}>
                    <input type={this.state.showPassword ? "text" : "password"} 
                        autoComplete="off"
                        maxLength="12"
                        className={`${styles.input}
                            ${this.state.highlighting.password ? styles.highlighting : ""}`}
                        value={this.state.password}
                        onChange={(e) => {
                            this.setState({ password: e.target.value });
                        }} />
                    <span className={styles["input-field-name"]}>
                        {/* name */ this.props.elementNames.EntryBar.password}
                    </span>

                    <div className={styles.eye}
                        title={this.props.elementNames.EntryBar.titlePassword}
                        onClick={() => {
                            this.setState({ showPassword: !this.state.showPassword ? true : false });
                        }}>
                        {!this.state.showPassword && <div className={styles["eye-slash"]}></div>}
                    </div>

                    {this.state.regError.incorrectPassword && <div className={styles.regError}>
                        {/* value */ this.props.elementNames.EntryBar.regErrorIncorrectPassword}
                    </div>}

                    {this.state.regError.shortPassword && <div className={styles.regError}>
                        {/* value */ this.props.elementNames.EntryBar.regErrorVeryShortPassword}
                    </div>}
                </div>
              
                {/*========== P I N - C O D E  ===========*/}
                <div className={styles["input-field"]}>
                    <input type="text" 
                        autoComplete="off"
                        maxLength="4"
                        className={`${styles.input}
                            ${this.state.highlighting.PINcode ? styles.highlighting : ""}`}
                        value={this.state.PINcode}
                        onChange={(e) => {
                            this.setState({ PINcode: e.target.value });
                        }} />
                    <span className={styles["input-field-name"]}>
                        {/* name */ this.props.elementNames.EntryBar.PINcode}
                    </span>

                    <div className={styles.tip}
                        title={this.props.elementNames.EntryBar.titlePINcode}>
                        ?
                    </div>

                    {this.state.regError.incorrectPINcode && <div className={styles.regError}>
                        {/* value */ this.props.elementNames.EntryBar.regErrorIncorrectPINcode}
                    </div>}
                </div>
              
                {/*========== К Н О П К И ===========*/}
                <div className={styles["buttons-container"]}>
                    <Button color="primary" style={ButtonStyle}
                        onClick={() => history.push("/aut")}>
                        {/* name */ this.props.elementNames.EntryBar.buttonCancel}
                    </Button>

                    <Button color="primary" style={ButtonStyle}
                        onClick={ this.confirmRegistration }>
                        {/* name */ this.props.elementNames.EntryBar.buttonContinue}
                    </Button>
                </div>
              
                {/*========== ПОДТВЕРЖДЕНИЕ РЕГИСТРАЦИИ ===========*/}
                {this.state.confirmRegistration && <div className={styles.confirmRegistration}>
                    <span>
                        {/* value */ this.props.elementNames.EntryBar.confirmOfRegistration}
                    </span>

                    <div className={styles["confirmRegistration-user-data"]}>
                        {/* Имя */}
                        <div className={styles["confirmRegistration-string"]}>
                            <span>{this.props.elementNames.EntryBar.name}:</span>
                            <div className={styles["confirmRegistration-ellipsis"]}></div>
                            <span>{this.state.name}</span>
                        </div>

                        {/* Логин */}
                        <div className={styles["confirmRegistration-string"]}>
                            <span>{this.props.elementNames.EntryBar.login}:</span>
                            <div className={styles["confirmRegistration-ellipsis"]}></div>
                            <span>{this.state.login}</span>
                        </div>

                        {/* Пароль */}
                        <div className={styles["confirmRegistration-string"]}>
                            <span>{this.props.elementNames.EntryBar.password}:</span>
                            <div className={styles["confirmRegistration-ellipsis"]}></div>
                            <span>{this.state.password}</span>
                        </div>

                        {/* ПИН-код */}
                        <div className={styles["confirmRegistration-string"]}>
                            <span>{this.props.elementNames.EntryBar.PINcode}:</span>
                            <div className={styles["confirmRegistration-ellipsis"]}></div>
                            <span>{this.state.PINcode}</span>
                        </div>
                    </div>

                    <div className={styles["buttons-container"]}>
                        <Button color="secondary" style={ButtonStyle}
                            onClick={() => this.setState({ confirmRegistration: false })}>
                            {/* name */ this.props.elementNames.EntryBar.buttonCancel}
                        </Button>

                        <Button color="primary" style={ButtonStyle}
                            onClick={this.registration}>
                            {/* name */ this.props.elementNames.EntryBar.buttonContinue}
                        </Button>
                    </div>
                </div>}

            </div>
        )
    }

}

export default EntryBarReg;