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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { withSnackbar } from 'notistack';

import history from '../../history';

class EntryBarReg extends React.Component {
    state = {
        showPassword: false,
        name: "",
        login: "",
        password: "",
        PIN: "",
        step: 1
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

    validName() {
        return !/[^a-zа-я]/i.test(this.state.name);
    }

    validLogin() {
        return !/[^a-z0-9_]/i.test(this.state.login) && !isFinite(this.state.login[0]);
    }

    validPassword() {
        return !/[^a-z0-9_-]/i.test(this.state.password) &&  this.state.password.length >= 8;
    }

    validPIN() {
        return isFinite(this.state.PIN) && this.state.PIN.length === 4;
    }

    goToSignUpConfirmation = () => {
        const { name, login, password, PIN } = this.state;
        
        if (!name || !login || !password || !PIN) {
            this.props.enqueueSnackbar("Заполните все поля", { variant: "warning" });
        }

        // Ошибка: некорректное имя
        if (name && login && password && PIN && !this.validName()) {
            this.props.enqueueSnackbar(
                "Некорректное имя. Не допускается использование цифр или символов",
                { variant: "warning" }
            );
        }

        // Ошибка: некорректный логин
        if (name && login && password && PIN && this.validName() && !this.validLogin()) {
            this.props.enqueueSnackbar(
                "Логин должен состоять из английских букв или букв с цифрами и не должен начинаться с цифр",
                { variant: "warning" }
            );
        }

        // Ошибка: некорректный пароль
        if (name && login && password && PIN && this.validName() && this.validLogin() && !this.validPassword()) {
            this.props.enqueueSnackbar(
                "Пароль должен быть длиной не менее 8 символов и состоять из цифр и английских букв",
                { variant: "warning" }
            );
        }

        if ( // Ошибка: некорректный PIN-код
            name && login && password && PIN &&
            this.validName() && this.validLogin() && this.validPassword() && !this.validPIN()
        ) {
            this.props.enqueueSnackbar(
                "ПИН-код должен состоять из 4 цифр",
                { variant: "warning" }
            );
        }

        if ( // Следующий шаг
            name && login && password && PIN &&
            this.validName() && this.validLogin() && this.validPassword() && this.validPIN()
        ) {
            this.setState({ step: 2 });
        }
    }

    signUp = () => {
        const { name, login, password, PIN } = this.state;

        try {
            this.props.signUp(name, login, password, PIN);
            this.props.enqueueSnackbar(
                `Пользователь ${this.state.name} успешно зарестрирован`,
                { variant: "success"}
            );
            history.push('/sign-in');
        } catch (error) {
            this.props.enqueueSnackbar(error, { variant: "error" });
        }
    }

    render() {
        return (
            <div className={styles.AuthBar}>
                <Typography variant="h5" color="primary">
                    Регистрация
                </Typography>

                {this.state.step === 1 && <form className={styles.form} noValidate autoComplete="off">
                    {/*========== И М Я ===========*/}
                    <TextField label="Имя"
                        margin="dense"
                        name="name"
                        value={this.state.name}
                        onChange={this.textFieldHandleChange}
                    />
                
                    {/*========== Л О Г И Н  ===========*/}
                    <TextField label="Логин"
                        margin="dense"
                        name="login"
                        value={this.state.login}
                        onChange={this.textFieldHandleChange}
                    />
                
                    {/*========== П А Р О Л Ь ===========*/}
                    <FormControl margin="dense">
                        <InputLabel htmlFor="sign-up-password-field">
                            Пароль
                        </InputLabel>
                        <Input
                            id="sign-up-password-field"
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
                
                    {/*========== P I N - C O D E  ===========*/}
                    <FormControl margin="dense">
                        <InputLabel htmlFor="sign-up-PIN-field">
                            ПИН-код
                        </InputLabel>
                        <Input id="sign-up-PIN-field"
                            inputProps={{ maxLength: 4 }}
                            name="PIN"
                            value={this.state.PIN}
                            onChange={this.textFieldHandleChange}
                        />
                    </FormControl>

                    <div className={styles.button_container}>
                        <Button color="primary" onClick={() => history.push("/sign-in")}>
                            Назад
                        </Button>

                        <Button variant="contained" color="primary" onClick={this.goToSignUpConfirmation}>
                            Продолжить
                        </Button>
                    </div>
                </form>}
              
                {/*========== ПОДТВЕРЖДЕНИЕ РЕГИСТРАЦИИ ===========*/}
                {this.state.step === 2 && <div className={styles.sign_up_confirmation}>
                    <Typography variant="body1">
                        Пожалуйста убедитесь что все данные верны. Если всё верно нажмите "зарегестрироваться"
                    </Typography>

                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left">Имя:</TableCell>
                                    <TableCell align="right">{this.state.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Логин:</TableCell>
                                    <TableCell align="right">{this.state.login}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Пароль:</TableCell>
                                    <TableCell align="right">{this.state.password}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">ПИН-код:</TableCell>
                                    <TableCell align="right">{this.state.PIN}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div className={styles.button_container}>
                        <Button color="primary" onClick={() => this.setState({ step: 1 })}>
                            Назад
                        </Button>

                        <Button variant="contained" color="primary" onClick={this.signUp}>
                            Зарегестрироваться
                        </Button>
                    </div>
                </div>}

            </div>
        );
    }
}

export default withSnackbar(EntryBarReg);
