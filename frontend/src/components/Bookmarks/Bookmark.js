import React from 'react';
import styles from './Bookmark.css';
import copy from 'copy-to-clipboard';
import { withSnackbar } from 'notistack';
import classNames from 'classnames';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';

function Bookmark(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const openLink = () => {
        window.open(props.URL);
        handleCloseMenu();
    };

    const copyLink = () => {
        copy(props.URL);
        props.enqueueSnackbar(
            `Скопировано в буфер обмена: ${props.URL}`,
            { variant: "info" }
        );
        handleCloseMenu();
    };

    const editLink = () => {
        props.edit(true, props.id, props.name, props.URL, props.isVisible);
        handleCloseMenu();
    };

    const deleteLink = () => {
        props.delete(props.id);
        handleCloseMenu();
    };

    const bookmarkClassNames = classNames({
        [styles.Bookmark]: true,
        [styles.hidden]: !props.isVisible,
        [styles.searched]: props.name.toLowerCase().indexOf(props.search.toLowerCase()) >= 0 && props.search 
    });

    return (
        <div className={bookmarkClassNames}>
            <div className={styles.border}></div>
            
            <img className={styles.icon}
                alt="*"
                src={'https://plus.google.com/_/favicon?domain_url=' + props.URL} 
            />

            <div className={styles.content}>
                <p className={styles.name}>
                    {props.name}
                </p>

                <a className={styles.URL} href={props.URL}>
                    {props.URL}
                </a>
            </div>

            <IconButton
                aria-controls={`bookmark-dropdown-menu-${props.id}`}
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClickMenu}
            >
                <MoreVertIcon color="action" />
            </IconButton>
            <Menu
                id={`bookmark-dropdown-menu-${props.id}`}
                anchorEl={anchorEl}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem dense onClick={openLink}>
                    <ListItemIcon>
                        <OpenInNewIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Открыть" />
                </MenuItem>

                <MenuItem dense onClick={copyLink}>
                    <ListItemIcon>
                        <FileCopyIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Копировать" />
                </MenuItem>

                <MenuItem dense onClick={editLink}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Редактировать" />
                </MenuItem>

                <MenuItem dense onClick={deleteLink}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Удалить" />
                </MenuItem>
            </Menu>
        </div>
    );
}

export default withSnackbar(Bookmark);
