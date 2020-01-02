import React from 'react';
import styles from './EntryBar.css';
import Button from './subcomponents/Button';
import history from '../history';

const ButtonStyle = {
    width: "120px",
    height: "30px",
    fontSize: "14px"
}

class EntryBarAut extends React.Component {
    constructor( props ) {
        super( props );
        this.entry = this.entry.bind(this);
        this.state = {
            showPassword: false,
            login: "",
            password: "",
            highlighting: {
                login: false,
                password: false,
            }
        }
    }

    highlighting( field ) {
        this.setState({ highlighting: { [field]: true } });
        setTimeout( () => {
            this.setState({ highlighting: false });
        }, 400 );
    }

    entry() {
        // Подсветка пустого текстового поля
        if(!this.state.login) {
            this.highlighting( "login" );
        }
        if(!this.state.password && this.state.login) {
            this.highlighting( "password" );
        }

        if( this.state.login && this.state.password ) {
            fetch( `api/users/${this.state.login}` )
                .then( res => res.json() )
                .then( 
                    user => {
                        if( !user.error && this.state.password === user.password ) {
                            localStorage.setItem( 'token', `${user.token}` );
                            this.props.authorization({ data: user });
                            history.push( "/bookmarks" )
                        } else {
                            this.props.showMessage({ 
                                text: this.props.elementNames.Message.errorOfLogIn,
                                color: "danger" 
                            });
                        }
                    }
                )
                .catch(
                    () => {
                        this.props.showMessage({ 
                            text: this.props.elementNames.Message.errorOfServer,
                            color: "danger" 
                        });
                    }
                )
        }
    }

    render() {
        return (
            <div className={styles.EntryBar}>
                <header className={styles.header}>
                    {/* header */ this.props.elementNames.EntryBar.AutBarHeader}
                </header>
              
                {/*========== Л О Г И Н ===========*/}
                <div className={styles["input-field"]}>
                    <input type="text"
                        autoComplete="off"
                        autoFocus
                        className={`${styles.input}
                            ${this.state.highlighting.login ? styles.highlighting : ""}`}
                        value={this.state.login}
                        onChange={(e) => {
                            this.setState({ login: e.target.value });
                        }} />
                    <span className={styles["input-field-name"]}>
                        {/* name */ this.props.elementNames.EntryBar.login}
                    </span>
                </div>
              
                {/*========== П А Р О Л Ь ===========*/}
                <div className={styles["input-field"]}>
                    <input type={this.state.showPassword ? "text" : "password"} 
                        autoComplete="off"
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
                </div>
              
                {/*========== К Н О П К И ===========*/}
                <div className={styles["buttons-container"]}>
                    <Button color="primary" style={ButtonStyle}
                        onClick={() => history.push("/reg")} >
                        {/* name */ this.props.elementNames.EntryBar.buttonRegistration}
                    </Button>

                    <button
                        onClick={ () => {
                            this.setState({ login: "joni1237", password: "12345678" });
                        } }>
                        sign in
                    </button>

                    <Button color="primary" style={ButtonStyle}
                        onClick={this.entry}>
                        {/* name */ this.props.elementNames.EntryBar.buttonAuthorization}
                    </Button>
                </div>
            </div>
        )
    }
}

export default EntryBarAut;
