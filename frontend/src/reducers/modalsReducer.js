const initialState = {
    AddLink: false,
    ChangeLink: false,
    ShowHiddenLinks: false,
    ChangePassword: false,
    ChangePIN: false,
    DeleteUser: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "OPEN_ADD_LINK":
            return { ...initialState, AddLink: true };

        case "OPEN_CHANGE_LINK":
            return { ...initialState, ChangeLink: true };
        
        case "OPEN_SHOW_HIDDEN_LINKS":
            return { ...initialState, ShowHiddenLinks: true };

        case "OPEN_CHANGE_PASSWORD":
            return { ...initialState, ChangePassword: true };

        case "OPEN_CHANGE_PIN_CODE":
            return { ...initialState, ChangePIN: true };
        
        case "OPEN_DELETE_USER":
            return { ...initialState, DeleteUser: true };

        case "CLOSE_MODAL":
            return initialState;
    }

    return state;
}
