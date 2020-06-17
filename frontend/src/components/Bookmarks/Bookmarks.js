import React from 'react';
import styles from './Bookmarks.css';
import { withSnackbar } from 'notistack';

import Bookmark from './Bookmark';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';

class Bookmarks extends React.Component {
    state = {
        search: "",
        newLink: {
            window: false,
            name: "",
            URL: "",
            hidden: false
        },
        editLink: {
            window: false,
            id: 0,
            name: "",
            URL: "",
            hidden: false
        },
        showHidden: {
            window: false,
            PIN: ""
        }
    };

    componentDidMount() {
        this.props.updateLinkList();
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    editSearch = (e) => {
        this.setState({ search: e.target.value });
    }

    toggleNewLinkWindow = (value) => {
        this.setState({
            newLink: {
                window: value,
                name: "",
                URL: "",
                hidden: false
            }
        });
    }

    editNewLink = (e) => {
        this.setState({
            newLink: {
                ...this.state.newLink,
                [e.target.name]: e.target.name === "hidden" ? e.target.checked : e.target.value
            }
        });
    }

    toggleEditLinkWindow = (value, id, name, URL, isVisible) => {
        this.setState({
            editLink: {
                window: value,
                id: id || 0,
                name: name || "",
                URL: URL || "",
                hidden: !isVisible || false
            }
        });
    }

    editExistLink = (e) => {
        this.setState({
            editLink: {
                ...this.state.editLink,
                [e.target.name]: e.target.name === "hidden" ? e.target.checked : e.target.value
            }
        });
    }

    toggleShowHiddenWindow = (value) => {
        this.setState({ showHidden: { window: value, PIN: "" } });
    }

    inputPIN = (e) => {
        this.setState({ showHidden: { ...this.state.showHidden, PIN: e.target.value } });
    }

    createLink = async () => {
        const { name, URL, hidden } = this.state.newLink;

        if (!name || !URL) {
            this.props.enqueueSnackbar("Введите название и адрес закладки", { variant: "warning" });
            return;
        }

        try {
            await this.props.createLink(name, URL, !hidden);
            this.toggleNewLinkWindow(false);
        } catch (error) {
            this.props.enqueueSnackbar(error, { variant: "error" });
        }
    }
    
    showHidden = async () => {
        const { PIN } = this.state.showHidden;

        if (!PIN && this.props.show === "visible") {
            this.props.enqueueSnackbar("Введите ПИН-код", { variant: "warning" });
            return;
        }

        try {
            await this.props.showHidden(PIN);
            this.toggleShowHiddenWindow(false);
        } catch (error) {
            this.props.enqueueSnackbar(error, { variant: "error" });
        }
    }

    changeLink = async () => {
        const { id, name, URL, hidden } = this.state.editLink;

        if (!name || !URL) {
            this.props.enqueueSnackbar("Введите название и адрес закладки", { variant: "warning" });
            return;
        }

        try {
            await this.props.changeLink(id, name, URL, !hidden);
            this.toggleEditLinkWindow(false);
        } catch (error) {
            this.props.enqueueSnackbar(error, { variant: "error" });
        }
    }

    deleteLink = (id) => {
        try {
            this.props.deleteLink(id);
        } catch (error) {
            this.props.enqueueSnackbar(error, { variant: "error" });
        }
    }
    
    render() {
        if (!this.props.isAuthorized) {
            return (
                <div className={styles.Bookmarks}>
                    <div className={styles.bookmark_container}></div>
                </div>
            );
        }

        return (
            <div className={styles.Bookmarks}>
                <div className={styles.control_bar}>
                    <Button variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => this.toggleShowHiddenWindow(true)}
                    >
                        Скрытые
                    </Button>

                    <TextField label="Поиск"
                        variant="outlined"
                        size="small"
                        onChange={this.editSearch}
                    />
                    
                    <div className={styles.large_screen_add_button}>
                        <Button variant="contained" 
                            color="primary"
                            size="small"
                            onClick={() => this.toggleNewLinkWindow(true)} 
                        >
                            Новая закладка
                        </Button>
                    </div>

                    <div className={styles.small_screen_add_button}>
                        <Fab color="primary" 
                            size="small" 
                            onClick={() => this.toggleNewLinkWindow(true)}
                        >
                            <AddIcon />
                        </Fab>
                    </div>
                </div>
                  
                {/* контейнер закладок */}
                <div className={styles.bookmark_container}>
                    {this.props.links.map(item => (
                        <Bookmark key={item.id}
                            id={item.id}
                            name={item.name}
                            URL={item.URL}
                            isVisible={item.isVisible}
                            search={this.state.search}
                            edit={this.toggleEditLinkWindow}
                            delete={this.deleteLink}
                        />
                    ))}

                    {this.props.isFetching && <div className={styles.loading}></div>}

                    {this.props.error && <Typography align="center">{this.props.error}</Typography>}
                </div>

                {/* ======= Модалка - новая закладка ======= */}
                <Dialog open={this.state.newLink.window}
                    onClose={() => this.toggleNewLinkWindow(false)}
                    aria-labelledby="new-link-window-title"
                >
                    <DialogTitle id="new-link-window-title">
                        Новая закладка
                    </DialogTitle>

                    <DialogContent>
                        <TextField autoFocus 
                            fullWidth
                            label="Название"
                            margin="dense"
                            name="name"
                            value={this.state.newLink.name}
                            onChange={this.editNewLink}
                        />

                        <TextField 
                            fullWidth
                            label="URL"
                            margin="dense"
                            name="URL"
                            value={this.state.newLink.URL}
                            onChange={this.editNewLink}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.newLink.hidden}
                                    onChange={this.editNewLink}
                                    name="hidden"
                                    color="primary"
                                />
                            }
                            label="Скрытая закладка"
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => this.toggleNewLinkWindow(false)} color="primary">
                            Отмена
                        </Button>

                        <Button onClick={this.createLink} color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* ======= Модалка - редактировать закладку ======= */}
                <Dialog open={this.state.editLink.window}
                    onClose={() => this.toggleEditLinkWindow(false)}
                    aria-labelledby="edit-link-window-title"
                >
                    <DialogTitle id="edit-link-window-title">
                        Редактировать закладку
                    </DialogTitle>

                    <DialogContent>
                        <TextField autoFocus 
                            fullWidth
                            label="Название"
                            margin="dense"
                            name="name"
                            value={this.state.editLink.name}
                            onChange={this.editExistLink}
                        />

                        <TextField 
                            fullWidth
                            label="URL"
                            margin="dense"
                            name="URL"
                            value={this.state.editLink.URL}
                            onChange={this.editExistLink}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.editLink.hidden}
                                    onChange={this.editExistLink}
                                    name="hidden"
                                    color="primary"
                                />
                            }
                            label="Скрытая закладка"
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => this.toggleEditLinkWindow(false)} color="primary">
                            Отмена
                        </Button>

                        <Button onClick={this.changeLink} color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* ======= Модалка - отобразить/спрятать скрытые закладки ======= */}
                <Dialog open={this.state.showHidden.window}
                    onClose={() => this.toggleShowHiddenWindow(false)}
                    aria-labelledby="show-hidden-window-title"
                >
                    <DialogTitle id="show-hidden-window-title">
                        {this.props.show === "visible" ? "Отобразить" : "Спрятать"} скрытые закладки
                    </DialogTitle>

                    {this.props.show === "visible" &&
                        <DialogContent>
                            <DialogContentText>
                                Введите ваш ПИН-код
                            </DialogContentText>

                            <TextField autoFocus 
                                fullWidth
                                label="ПИН-код"
                                margin="dense"
                                name="PIN"
                                inputProps={{ maxLength: 4 }}
                                value={this.state.showHidden.PIN}
                                onChange={this.inputPIN}
                            />
                        </DialogContent>
                    }

                    <DialogActions>
                        <Button onClick={() => this.toggleShowHiddenWindow(false)} color="primary">
                            Отмена
                        </Button>

                        <Button onClick={this.showHidden} color="primary">
                            {this.props.show === "visible" ? "Отобразить" : "Скрыть"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
  
export default withSnackbar(Bookmarks);  
