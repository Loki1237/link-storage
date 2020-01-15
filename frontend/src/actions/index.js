export const SetAppData = ownProps => ({
    type: "SET_APP_DATA",
    lang: ownProps.lang,
    user: ownProps.user
});

export const OpenUserMenu = {
    type: "OPEN_USER_MENU"
};

export const CloseUserMenu = {
    type: "CLOSE_USER_MENU"
};

export const OpenAddLink = {
    type: "OPEN_ADD_LINK"
};

export const OpenChangeLink = {
    type: "OPEN_CHANGE_LINK"
};

export const OpenShowHiddenLinks = {
    type: "OPEN_SHOW_HIDDEN_LINKS"
};

export const OpenChangePassword = {
    type: "OPEN_CHANGE_PASSWORD"
};

export const OpenChangePINcode = {
    type: "OPEN_CHANGE_PIN_CODE"
};

export const OpenDeleteUser = {
    type: "OPEN_DELETE_USER"
};