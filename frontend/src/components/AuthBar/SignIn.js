import React from 'react';
import styles from './Styles.css';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withSnackbar } from 'notistack';

import history from '../../history';

class EntryBarAut extends React.Component {
    state = {
        showPassword: false,
        login: "",
        password: ""
    };

    componentDidMount () {
        if (this.props.isAuthorized) {
            history.push('/bookmarks');
        }
    }

    textFieldHandleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    login = async () => {
        const { login, password } = this.state;
        
        if (!password || !login) {
            this.props.enqueueSnackbar("Введите логин и пароль", { variant: "warning" });
            return;
        }

        try {
            await this.props.signIn(login, password);
            history.push('/bookmarks');
        } catch (error) {
            this.props.enqueueSnackbar(error, { variant: "error" });
        }
    }

    render() {
        return (
            <div className={styles.AuthBar}>
                <Typography variant="h5" color="primary">
                    Авторизация
                </Typography>

                <form className={styles.form} noValidate autoComplete="off">
                    {/*========== Л О Г И Н ===========*/}
                    <TextField label="Логин"
                        margin="dense"
                        name="login"
                        value={this.state.login}
                        onChange={this.textFieldHandleChange}
                    />

                    {/*========== П А Р О Л Ь ===========*/}
                    <FormControl margin="dense">
                        <InputLabel htmlFor="sign-in-password-field">
                            Пароль
                        </InputLabel>
                        <Input id="sign-in-password-field"
                            type={this.state.showPassword ? 'text' : 'password'}
                            name="password"
                            value={this.state.password}
                            onChange={this.textFieldHandleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </form>
              
                <div className={styles.button_container}>
                    <Button color="primary" onClick={() => history.push("/sign-up")}>
                        Регистрация
                    </Button>

                    <Button variant="contained" color="primary" onClick={this.login}>
                        Войти
                    </Button>
                </div>
            </div>
        );
    }
}

export default withSnackbar(EntryBarAut);
