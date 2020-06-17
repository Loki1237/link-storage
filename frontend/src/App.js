import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import styles from './App.css';
import 'fontsource-roboto';
import { withSnackbar } from 'notistack';

import { changePassword, changePIN, deleteUser } from './actions/user';
import { loginAs, logout } from './actions/auth';
import { connect } from 'react-redux';

import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Bookmarks from './containers/Bookmarks';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class App extends React.Component {
    state = {
        menu: false,
        changePassword: {
            window: false,
            oldPassword: "",
            showOldPassword: false,
            newPassword: "",
            showNewPassword: false
        },
        changePIN: {
            window: false,
            password: "",
            showPassword: false,
            newPIN: ""
        },
        deleteProfileWindow: false
    };

    async componentDidMount() {
        try {
            await this.props.loginAs();
            history.push("/bookmarks");
        } catch (error) {
            history.push("/sign-in");
            this.props.enqueueSnackbar(error, { variant: "error" });
        }
    }

    toggleDrawer = (value) => {
        this.setState({ menu: value });
    }

    toggleChangePasswordWindow = (value) => {
        this.setState({
            changePassword: {
                window: value,
                oldPassword: "",
                showOldPassword: false,
                newPassword: "",
                showNewPassword: false
            }
        });
        this.toggleDrawer(false);
    }

    editChangePasswordFields = (e) => {
        this.setState({ 
            changePassword: { 
                ...this.state.changePassword, 
                [e.target.name]: e.target.value
            } 
        });
    }

    handleClickShowOldPassword = () => {
        this.setState({
            changePassword: {
                ...this.state.changePassword,
                showOldPassword: !this.state.changePassword.showOldPassword
            }
        });
    }

    handleClickShowNewPassword = () => {
        this.setState({
            changePassword: {
                ...this.state.changePassword,
                showNewPassword: !this.state.changePassword.showNewPassword
            }
        });
    }

    toggleChangePINWindow = (value) => {
        this.setState({
            changePIN: {
                window: value,
                password: "",
                showPassword: false,
                newPIN: ""
            }
        });
        this.toggleDrawer(false);
    }

    editChangePINFields = (e) => {
        this.setState({ 
            changePIN: { 
                ...this.state.changePIN,
                [e.target.name]: e.target.value
            }
        });
    }

    handleClickShowPasswordFromChangePIN = () => {
        this.setState({
            changePIN: {
                ...this.state.changePIN,
                showPassword: !this.state.changePIN.showPassword
            }
        });
    }

    toggleDeleteProfileWindow = (value) => {
        this.setState({ deleteProfileWindow: value });
        this.toggleDrawer(false);
    }

    changePassword = async () => {
        const { oldPassword, newPassword } = this.state.changePassword;

        if (!oldPassword) {
            this.props.enqueueSnackbar("Введите ваш пароль", { variant: "warning" });
            return;
        }

        if (oldPassword && !newPassword) {
            this.props.enqueueSnackbar("Введите новый пароль", { variant: "warning" });
            return;
        }

        try {
            await this.props.changePassword(oldPassword, newPassword);

            this.props.enqueueSnackbar("Новый пароль успешно сохранён", { variant: "success" });
            this.toggleChangePasswordWindow(false);
        } catch (error) {
            this.props.enqueueSnackbar(error, { variant: "error" });
        }
    }

    changePIN = async () => {
        const { password, newPIN } = this.state.changePIN;

        if (!password) {
            this.props.enqueueSnackbar("Введите ваш пароль", { variant: "warning" });
            return;
        }

        if (password && !newPIN) {
            this.props.enqueueSnackbar("Введите новый ПИН-код", { variant: "warning" });
            return;
        }

        try {
            await this.props.changePIN(password, newPIN);

            this.props.enqueueSnackbar("Новый ПИН-код успешно сохранён", { variant: "success" });
            this.toggleChangePINWindow(false);
        } catch (error) {
            this.props.enqueueSnackbar(error, { variant: "error" });
        }
    }

    deleteUser = async () => {
        try {
            await this.prosp.deleteUser();
            history.push('/sign-in');
        } catch (error) {
            this.props.enqueueSnackbar(error, { variant: "error" });
        }
    }

    logout = async () => {
        try {
            await this.props.logout();

            this.toggleDrawer(false);
            history.push("/sign-in");
        } catch (error) {
            this.props.enqueueSnackbar(error, { variant: "error" });
        }
    }

    render() {
        return (
            <div className={styles["body-app"]}>
                <AppBar position="relative">
                    <Toolbar variant="dense" className={styles.Toolbar}>
                        <Typography variant="h6">
                            Link Storage
                        </Typography>
                        
                        {this.props.isAuthorized &&
                            <IconButton color="inherit" onClick={() => this.toggleDrawer(true)}>
                                <ListIcon />
                            </IconButton>
                        }
                    </Toolbar>
                </AppBar>
                
                <Router history={history}>
                    <Route path="/sign-in">
                        <SignIn />
                    </Route>

                    <Route path="/sign-up">
                        <SignUp />
                    </Route>
            
                    <Route path="/bookmarks">
                        <Bookmarks />
                    </Route>
                </Router>

                <Drawer anchor="right" open={this.state.menu}
                    onClose={() => this.toggleDrawer(false)}
                >
                    <List>
                        <ListItem>
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="Настройки" />
                        </ListItem>

                        <Divider />

                        <ListItem button onClick={() => this.toggleChangePasswordWindow(true)}>
                            <ListItemIcon><EditIcon /></ListItemIcon>
                            <ListItemText primary="Изменить пароль" />
                        </ListItem>

                        <ListItem button onClick={() => this.toggleChangePINWindow(true)}>
                            <ListItemIcon><EditIcon /></ListItemIcon>
                            <ListItemText primary="Изменить ПИН-код" />
                        </ListItem>

                        <ListItem button onClick={() => this.toggleDeleteProfileWindow(true)}>
                            <ListItemIcon><DeleteIcon /></ListItemIcon>
                            <ListItemText primary="Удалить профиль" />
                        </ListItem>

                        <Divider />

                        <ListItem button onClick={this.logout}>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Выйти" />
                        </ListItem>
                    </List>
                </Drawer>

                {/* ======= Модалка - изменить пароль ======= */}
                <Dialog open={this.state.changePassword.window}
                    maxWidth="xs"
                    onClose={() => this.toggleChangePasswordWindow(false)}
                    aria-labelledby="change-password-window-title"
                >
                    <DialogTitle id="change-password-window-title">
                        Изменить пароль
                    </DialogTitle>

                    <DialogContent>
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="change-password-old-password-field">
                                Старый пароль
                            </InputLabel>
                            <Input fullWidth
                                id="change-password-old-password-field"
                                type={this.state.changePassword.showOldPassword ? 'text' : 'password'}
                                name="oldPassword"
                                value={this.state.changePassword.oldPassword}
                                onChange={this.editChangePasswordFields}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowOldPassword}
                                        >
                                            {this.state.changePassword.showOldPassword 
                                                ? <Visibility /> 
                                                : <VisibilityOff />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="change-password-new-password-field">
                                Новый пароль
                            </InputLabel>
                            <Input
                                id="change-password-new-password-field"
                                type={this.state.changePassword.showNewPassword ? 'text' : 'password'}
                                name="newPassword"
                                value={this.state.changePassword.newPassword}
                                onChange={this.editChangePasswordFields}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowNewPassword}
                                        >
                                            {this.state.changePassword.showNewPassword 
                                                ? <Visibility /> 
                                                : <VisibilityOff />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => this.toggleChangePasswordWindow(false)} color="primary">
                            Отмена
                        </Button>

                        <Button onClick={this.changePassword} color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* ======= Модалка - изменить PIN ======= */}
                <Dialog open={this.state.changePIN.window}
                    maxWidth="xs"
                    onClose={() => this.toggleChangePINWindow(false)}
                    aria-labelledby="change-PIN-window-title"
                >
                    <DialogTitle id="change-PIN-window-title">
                        Изменить ПИН-код
                    </DialogTitle>

                    <DialogContent>
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="change-PIN-password-field">
                                Пароль
                            </InputLabel>
                            <Input autoFocus
                                id="change-PIN-password-field"
                                type={this.state.changePIN.showPassword ? 'text' : 'password'}
                                name="password"
                                value={this.state.changePIN.password}
                                onChange={this.editChangePINFields}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPasswordFromChangePIN}
                                        >
                                            {this.state.changePIN.showPassword 
                                                ? <Visibility /> 
                                                : <VisibilityOff />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <TextField fullWidth
                            label="Новый ПИН-код"
                            margin="dense"
                            name="newPIN"
                            inputProps={{ maxLength: 4 }}
                            value={this.state.changePIN.newPIN}
                            onChange={this.editChangePINFields}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => this.toggleChangePINWindow(false)} color="primary">
                            Отмена
                        </Button>

                        <Button onClick={this.changePIN} color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* ======= Модалка - удалить профиль ======= */}
                <Dialog open={this.state.deleteProfileWindow} 
                    onClose={() => this.toggleDeleteProfileWindow(false)} 
                    aria-labelledby="delete-profile-window-title"
                >
                    <DialogTitle id="delete-profile-window-title">
                        Удалить профиль
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            После удаления вашего профиля восстановить его будет невазможно.
                            Уверены что хотите продолжить?
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => this.toggleDeleteProfileWindow(false)} color="primary">
                            Отмена
                        </Button>

                        <Button onClick={this.deleteUser} color="primary">
                            Подтвердить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthorized: state.auth.isAuthorized
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changePassword: (oldPassword, newPassword) => dispatch(changePassword(oldPassword, newPassword)),
        changePIN: (password, PIN) => dispatch(changePIN(password, PIN)),
        deleteUser: () => dispatch(deleteUser()),
        loginAs: () => dispatch(loginAs()),
        logout: () => dispatch(logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(App));
