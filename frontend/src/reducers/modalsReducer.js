const initialState = {
    AddLink: false,
    ChangeLink: false,
    ShowHiddenLinks: false,
    ChangePassword: false,
    ChangePINcode: false,
    DeleteUser: false
}

export default function( state = initialState, action ) {
    switch( action.type ) {
        case "OPEN_ADD_LINK":
            return Object.assign({}, initialState, { AddLink: true });

        case "OPEN_CHANGE_LINK":
            return Object.assign({}, initialState, { ChangeLink: true });
        
        case "OPEN_SHOW_HIDDEN_LINKS":
            return Object.assign({}, initialState, { ShowHiddenLinks: true });

        case "OPEN_CHANGE_PASSWORD":
            return Object.assign({}, initialState, { ChangePassword: true });

        case "OPEN_CHANGE_PIN_CODE":
            return Object.assign({}, initialState, { ChangePINcode: true });
        
        case "OPEN_DELETE_USER":
            return Object.assign({}, initialState, { DeleteUser: true });

        case "CLOSE_MODAL":
            return initialState;
    }

    return state;
}