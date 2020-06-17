const initialState = {
    isAuthorized: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "USER_SET_IS_AUTHORIZED":
            return {
                ...state,
                isAuthorized: action.isAuthorized
            }
    }

    return state;
}
