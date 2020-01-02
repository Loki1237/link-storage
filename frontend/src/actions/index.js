export const setLanguage = ownProps => ({
    type: "SET_LANGUAGE",
    lang: ownProps.lang
})

export const authorization = ownProps => ({
    type: "AUTHORIZATION",
    data: ownProps.data
})

export const openUserMenu = {
    type: "OPEN_USER_MENU"
}

export const closeUserMenu = {
    type: "CLOSE_USER_MENU"
}

export const openAddLink = {
    type: "OPEN_ADD_LINK"
}

export const openChangeLink = {
    type: "OPEN_CHANGE_LINK"
}

export const openShowHiddenLinks = {
    type: "OPEN_SHOW_HIDDEN_LINKS"
}

export const openChangePassword = {
    type: "OPEN_CHANGE_PASSWORD"
}

export const openChangePINcode = {
    type: "OPEN_CHANGE_PIN_CODE"
}

export const openDeleteUser = {
    type: "OPEN_DELETE_USER"
}

export const showMessage = ownProps => ({
    type: "SHOW_MESSAGE",
    text: ownProps.text,
    color: ownProps.color,
    lifeTime: new Date().getTime() + 2000
})
